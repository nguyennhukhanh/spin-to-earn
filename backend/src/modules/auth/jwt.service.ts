import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { StellaConfig } from 'src/configs';
import type { AdminAuthConfig } from 'src/configs/admin_auth.config';
import type { UserAuthConfig } from 'src/configs/user_auth.config';
import type { TokensType } from 'src/shared/types';

enum JwtAuthRole {
  USER_AUTH = 'userAuth',
  ADMIN_AUTH = 'adminAuth',
}

@Injectable()
export class MyJwtService {
  constructor(
    private readonly configService: ConfigService<StellaConfig>,
    private readonly jwtService: JwtService,
  ) {}

  private async signTokens(
    payload: { session: string },
    role: JwtAuthRole,
  ): Promise<TokensType> {
    const authConfig = this.configService.get<AdminAuthConfig | UserAuthConfig>(
      role,
    );

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: authConfig.accessTokenLifetime,
      secret: authConfig.accessTokenSecret,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: authConfig.refreshTokenLifetime,
      secret: authConfig.refreshTokenSecret,
    });

    const expiresAt =
      Math.floor(Date.now()) + authConfig.accessTokenLifetime * 1000; // in milliseconds

    return { accessToken, refreshToken, expiresAt };
  }

  async signUserTokens(payload: { session: string }): Promise<TokensType> {
    return this.signTokens(payload, JwtAuthRole.USER_AUTH);
  }
}
