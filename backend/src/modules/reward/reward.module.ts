import { Module } from '@nestjs/common';

import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';

@Module({
  providers: [RewardService],
  controllers: [RewardController],
})
export class RewardModule {}
