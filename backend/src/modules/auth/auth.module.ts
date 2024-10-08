import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserSession } from 'src/database/entities';

import { ServicesModule } from '../services/services.module';
import { SessionModule } from '../session/session.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthHelperService } from './auth_helper.service';
import { HashService } from './hash.service';
import { MyJwtService } from './jwt.service';
import { UserJwtStrategy } from './strategies/user_jwt.strategy';
import { UserJwtRefreshTokenStrategy } from './strategies/user_jwt_refresh_token.strategy';
import { WalletService } from './wallet.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserSession]),
    JwtModule.register({}),
    SessionModule,
    ServicesModule,
    HttpModule,
    UserModule,
  ],
  providers: [
    AuthHelperService,
    MyJwtService,

    HashService,
    UserJwtStrategy,
    UserJwtRefreshTokenStrategy,
    WalletService,
  ],
  controllers: [AuthController],
  exports: [MyJwtService],
})
export class AuthModule {}
