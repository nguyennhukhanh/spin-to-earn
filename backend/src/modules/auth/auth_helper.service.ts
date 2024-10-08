import { Injectable } from '@nestjs/common';
import type { User } from 'src/database/entities';
import type { JwtPayloadType, TokensType } from 'src/shared/types';

import { SessionService } from '../session/session.service';
import { MyJwtService } from './jwt.service';

@Injectable()
export class AuthHelperService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly jwtService: MyJwtService,
  ) {}

  async createTokensAsUser(user: User): Promise<TokensType> {
    const { id } = await this.sessionService.createUserSession({
      user,
    });

    const tokens = await this.jwtService.signUserTokens({
      session: id,
    });

    return tokens;
  }

  async refreshTokenAsUser(payload: JwtPayloadType): Promise<TokensType> {
    const { session } = payload;
    const { id } = await this.sessionService.createUserSession({
      id: session,
    });

    const tokens = await this.jwtService.signUserTokens({
      session: id,
    });

    return tokens;
  }

  async logoutAsUser(session: string): Promise<boolean> {
    return await this.sessionService.deleteUserSession({
      id: session,
    });
  }
}
