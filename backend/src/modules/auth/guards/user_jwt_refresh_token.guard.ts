import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserJwtRefreshTokenGuard extends AuthGuard('refresh-token') {
  constructor() {
    super();
  }
}
