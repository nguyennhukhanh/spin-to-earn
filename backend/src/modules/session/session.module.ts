import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSession } from 'src/database/entities';

import { SessionService } from './session.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserSession])],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
