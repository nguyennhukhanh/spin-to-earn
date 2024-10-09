import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { ExceptionFilter } from './common/exceptions/exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { load } from './configs';
import { AuthModule } from './modules/auth/auth.module';
import { HealthController } from './modules/default/health.controller';
import { PointModule } from './modules/point/point.module';
import { RewardModule } from './modules/reward/reward.module';
import { SessionModule } from './modules/session/session.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { UserModule } from './modules/user/user.module';
import { OrmModule } from './orm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    OrmModule,
    AuthModule,
    UserModule,
    SessionModule,
    RewardModule,
    TicketModule,
    PointModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
