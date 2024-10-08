import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { load } from './configs';
import { OrmModule } from './orm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load,
    }),
    OrmModule,
  ],
})
export class AppWorkerModule {}
