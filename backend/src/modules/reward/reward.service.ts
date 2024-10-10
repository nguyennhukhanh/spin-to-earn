import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { User } from 'src/database/entities';
import { Reward } from 'src/database/entities';
import type { CommonQuery } from 'src/shared/dto/common.query';
import type { QueryPaginationDto } from 'src/shared/dto/pagination.query';
import {
  type FetchResult,
  FetchType,
  paginateEntities,
} from 'src/utils/paginate';
import { Repository } from 'typeorm';

@Injectable()
export class RewardService {
  constructor(
    @InjectRepository(Reward)
    private readonly rewardRepository: Repository<Reward>,
  ) {}

  async history(
    user?: User,
    query?: CommonQuery,
    pagination?: QueryPaginationDto,
  ): Promise<FetchResult<Reward>> {
    try {
      const { search, fromDate, toDate, sort } = query;

      const queryBuilder = this.rewardRepository
        .createQueryBuilder('reward')
        .innerJoin('user', 'user', 'user.walletAddress = reward.fromAddress');

      const conditions = [
        {
          condition: search,
          query:
            '(user.fullName LIKE :search OR reward.fromAddress LIKE :search OR reward.toAddress LIKE :search)',
          param: { search: `%${search}%` },
        },
        {
          condition: user.walletAddress,
          query: '(user.walletAddress LIKE :walletAddress)',
          param: { walletAddress: `%${user.walletAddress}%` },
        },
        {
          condition: fromDate,
          query: 'reward.createdAt >= :fromDate',
          param: { fromDate },
        },
        {
          condition: toDate,
          query: 'reward.createdAt <= :toDate',
          param: { toDate },
        },
      ];

      conditions.forEach(({ condition, query, param }) => {
        if (condition) {
          queryBuilder.andWhere(query, param);
        }
      });

      if (sort) {
        queryBuilder.orderBy(`reward.createdAt`, sort);
      }

      return await paginateEntities<Reward>(
        queryBuilder,
        pagination,
        FetchType.MANAGED,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
