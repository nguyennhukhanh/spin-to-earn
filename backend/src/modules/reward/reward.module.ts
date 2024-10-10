import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reward } from 'src/database/entities';

import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reward])],
  providers: [RewardService],
  controllers: [RewardController],
})
export class RewardModule {}
