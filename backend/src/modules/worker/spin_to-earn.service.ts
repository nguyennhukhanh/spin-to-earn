import pRetry from '@fullstax/p-retry';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Provider } from 'ethers';
import { JsonRpcProvider } from 'ethers';
import pLimit from 'p-limit';
import type { StellaConfig } from 'src/configs';
import type { MainConfig } from 'src/configs/main.config';
import type { SpinToEarnAbi } from 'src/contracts';
import { SpinToEarnAbi__factory } from 'src/contracts';
import { LatestBlock, Point, Reward, User } from 'src/database/entities';
import { getFromCache } from 'src/utils/cache';
import { getLogger } from 'src/utils/logger';
import { unixToUTCDate } from 'src/utils/moment';
import type { EntityManager } from 'typeorm';
import { DataSource } from 'typeorm';

import { RedisService } from '../services/redis.service';

const logger = getLogger('CrawlService');

enum EventType {
  TicketsPurchased = 'TicketsPurchased',
  PointsAssigned = 'PointsAssigned',
  RewardClaimed = 'RewardClaimed',
}

const BATCH_SIZE = 100;
const BATCH_LIMIT = 20;
const limit = pLimit(BATCH_LIMIT);

@Injectable()
export class CrawlService {
  private _provider: Provider;
  private _contractAddress: string;
  private _contract: SpinToEarnAbi;
  private _ethersReady = false;
  private _latestBlock: number;
  private _beginningBlock = 44578981;
  private _symbolNetwork: string;

  constructor(
    private configService: ConfigService<StellaConfig>,
    private dataSource: DataSource,
    private redisService: RedisService,
  ) {
    this.init().catch((error) => {
      logger.error('Init Crawl Token Worker Error: ');
      logger.error(error);
    });
  }

  async init() {
    this._ethersReady = await this.startEthers();

    if (this._ethersReady) {
      await this.listenPastEvents();
      await this.listenRealtimeEvents();
    } else {
      logger.error('Ethers is not ready yet!');
      return;
    }
  }

  async startEthers(): Promise<boolean> {
    const retryOptions = {
      retries: 5,
      factor: 2,
      minTimeout: 5000,
      maxTimeout: 30000,
      onFailedAttempt: (error: any) => {
        logger.warn(
          `Attempt ${error.attemptNumber} failed. ${error.retriesLeft} retries left.`,
        );
        logger.error(error);
      },
    };

    try {
      await pRetry(async () => {
        this._symbolNetwork = 'BSC';

        this._provider = new JsonRpcProvider(
          this.configService.get<MainConfig>('main').rpcEndpoint,
        );

        this._contractAddress =
          this.configService.get<MainConfig>('main').contractAddress;
        this._contract = SpinToEarnAbi__factory.connect(
          this._contractAddress,
          this._provider,
        );

        const network = await this._provider.getNetwork();
        if (!network) {
          throw new Error('Failed to connect to provider');
        }
      }, retryOptions);

      return true;
    } catch (error) {
      logger.error('Error starting Ethers after retries:');
      logger.error(error);
      return false;
    }
  }

  async listenPastEvents(): Promise<void> {
    this._latestBlock = await this.getLatestBlock();

    // Check if there is a latest block in redis
    const key = `crawl:${this._symbolNetwork}_${this._contractAddress}`;
    const latestBlockRedis = await this.redisService.get(key);
    if (latestBlockRedis && Number(latestBlockRedis) > this._latestBlock) {
      this._latestBlock = Number(latestBlockRedis);
    }

    let fromBlock = Number(this._latestBlock);
    const toBlock = await this._provider.getBlockNumber();

    while (fromBlock <= toBlock) {
      const batchToBlock = Math.min(fromBlock + BATCH_SIZE - 1, toBlock);

      const events = await this.fetchEvents(
        EventType.RewardClaimed,
        fromBlock,
        batchToBlock,
      );

      if (events.length > 0) {
        await this.handleEventsInBatches(events);
        await this.updateLatestBlock(this.dataSource.manager, batchToBlock);
      }

      logger.debug(
        `[${this._symbolNetwork}] | Crawl Song: ${fromBlock} - ${batchToBlock}`,
      );

      fromBlock = batchToBlock + 1;
    }

    logger.info(
      `[${this._symbolNetwork}] | Crawl Song with Past Events: Done!`,
    );
    this._latestBlock = fromBlock;
  }

  async listenRealtimeEvents(): Promise<void> {
    const poll = async () => {
      try {
        const latestBlock = await this._provider.getBlockNumber();
        const events = await this.fetchEvents(
          EventType.RewardClaimed,
          this._latestBlock,
          latestBlock,
        );

        if (events.length > 0) {
          await this.handleEventsInBatches(events);
        } else {
          logger.debug(
            `[${this._symbolNetwork}] | No new events found: ${this._latestBlock} - ${latestBlock}`,
          );
        }

        this._latestBlock = latestBlock;

        // Set latest block in redis
        const key = `crawl:${this._symbolNetwork}_${this._contractAddress}`;
        await this.redisService.set(key, this._latestBlock, 3600); // 1 hour
      } catch (error) {
        logger.error(
          `[${this._symbolNetwork}] | Error polling for real-time events: ${error.message}`,
        );
      }

      // Poll again after 10 seconds
      setTimeout(poll, 10000);
    };

    // Start polling
    poll();
  }

  private async getLatestBlock(): Promise<number> {
    return this.dataSource.transaction(async (manager) => {
      const latestBlockKey = `crawl_${this._symbolNetwork}_${this._contractAddress}`;

      const latestBlock = await manager
        .createQueryBuilder(LatestBlock, 'block')
        .setLock('pessimistic_write')
        .where('block.key = :key', { key: latestBlockKey })
        .select(['block.blockNumber'])
        .getOne();

      return (
        Number(latestBlock?.blockNumber) ||
        this.configService.get<MainConfig>('main').beginningBlock ||
        this._beginningBlock
      );
    });
  }

  private async updateLatestBlock(
    manager: EntityManager,
    toBlock: number,
  ): Promise<void> {
    await manager.transaction(async (transactionalEntityManager) => {
      const latestBlockKey = `crawl_${this._symbolNetwork}_${this._contractAddress}`;

      let latestBlock = await transactionalEntityManager
        .createQueryBuilder(LatestBlock, 'block')
        .setLock('pessimistic_write')
        .where('block.key = :key', { key: latestBlockKey })
        .getOne();

      if (!latestBlock) {
        latestBlock = new LatestBlock();
        latestBlock.key = latestBlockKey;
      }

      latestBlock.blockNumber = toBlock;
      await transactionalEntityManager.save(latestBlock);
    });
  }

  private async handleRewardClaimedEvent(event: any): Promise<void> {
    const { blockNumber, transactionHash, address } = event;
    const [user, points, reward] = event.args;

    const transaction = await this._provider.getTransaction(transactionHash);

    const from = transaction.from;
    const to = transaction.to;

    const block = await this._provider.getBlock(blockNumber);
    const { timestamp } = block;

    await this.dataSource.transaction(async (manager) => {
      const rewardClaimed = await getFromCache(
        `rewardClaimed_${transactionHash}_${blockNumber}`,
        async () => {
          return manager.findOne(Reward, {
            where: {
              transactionHash,
              blockTimestamp: unixToUTCDate(timestamp),
            },
            select: ['id'],
          });
        },
        60, // 1 minute
      );

      if (!rewardClaimed) {
        const userExist = await manager.findOne(User, {
          where: { walletAddress: from },
          select: ['id'],
        });

        if (userExist) {
          const [pointResult, rewardResult] = await Promise.all([
            manager.save(Point, {
              user: userExist,
              amount: -points.toString(),
            }),
            manager.save(Reward, {
              fromAddress: from,
              toAddress: to,
              points: points.toString(),
              reward: reward.toString(),
              blockTimestamp: unixToUTCDate(timestamp),
              blockNumber,
              transactionHash,
            }),
          ]);

          logger.verbose(
            `[${this._symbolNetwork}] | Crawl Song Successful [RewardID - PointID - Block Number - Transaction Hash]: [${rewardResult.id} - ${pointResult.id} - ${blockNumber} - ${transactionHash}]`,
          );
        }
      }

      await this.updateLatestBlock(manager, blockNumber);
    });
  }

  private async fetchEvents(
    eventName: EventType,
    fromBlock: number,
    toBlock: number,
  ): Promise<any[]> {
    const filter = this._contract.filters[eventName]();
    return await this._contract.queryFilter(filter, fromBlock, toBlock);
  }

  private async handleEventsInBatches(events: any[]): Promise<void> {
    const promises = events.map((event) =>
      limit(() => this.handleRewardClaimedEvent(event)),
    );
    await Promise.all(promises);
  }
}
