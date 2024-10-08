import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import type { StellaConfig } from 'src/configs';
import { User } from 'src/database/entities';
import type { TokensType } from 'src/shared/types';
import { Equal, Repository } from 'typeorm';
import Web3 from 'web3';

import { AuthHelperService } from './auth_helper.service';
import type { WalletValidateDto } from './dto/wallet.validate';

@Injectable()
export class WalletService {
  private web3: Web3;
  constructor(
    private readonly configService: ConfigService<StellaConfig>,
    private readonly authHelperService: AuthHelperService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.web3 = new Web3();
  }

  async getNonce(walletAddress: string): Promise<number> {
    const userWalletExist = await this.getUserByWallet(walletAddress);
    if (!userWalletExist) return -1;

    const nonce = userWalletExist.nonce + 1;
    await this.userRepository.update(
      { walletAddress: Equal(walletAddress) },
      { nonce },
    );

    return nonce;
  }

  async loginAsUserWithWallet(dto: WalletValidateDto) {
    let userExist = await this.getUserByWallet(dto.walletAddress);

    const nonce = userExist?.nonce >= 0 ? userExist.nonce : -1;
    await this.validateSignature(dto, nonce);

    userExist = await this.loginByWallet(dto, nonce, userExist);

    return await this.createUserSession(userExist);
  }

  private async loginByWallet(
    dto: WalletValidateDto,
    nonce: number,
    userExist: User,
  ): Promise<User> {
    const { walletAddress } = dto;

    if (userExist) {
      await this.userRepository.update(
        { walletAddress: Equal(walletAddress) },
        {
          nonce,
        },
      );

      userExist.nonce = nonce;

      return userExist;
    }

    const userCreated = await this.userRepository.save({
      walletAddress,
      nonce,
    });

    return userCreated;
  }

  private getSignMessage(nonce: number) {
    return (
      this.configService.get('userAuth.signatureMessage', { infer: true }) +
      ` Nonce: ${nonce}`
    );
  }

  private async validateSignature(
    data: WalletValidateDto,
    nonce: number,
  ): Promise<void> {
    try {
      const signMessage = this.getSignMessage(nonce);
      const wallet = this.web3.eth.accounts.recover(
        signMessage,
        data.signature,
      );

      if (!wallet || wallet.toLowerCase() != data.walletAddress.toLowerCase())
        throw new BadRequestException('Invalid signature');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async getUserByWallet(wallet: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { walletAddress: Equal(wallet) },
    });
  }

  private async createUserSession(
    user: User,
  ): Promise<{ user: User | any; tokens: TokensType }> {
    const tokens = await this.authHelperService.createTokensAsUser(user);

    return {
      user: {
        ...user,
        password: undefined,
        token: tokens.accessToken,
      },
      tokens,
    };
  }
}
