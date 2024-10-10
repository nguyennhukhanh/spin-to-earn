import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/user.decorator';
import type { Reward } from 'src/database/entities';
import { User } from 'src/database/entities';
import { CommonQuery } from 'src/shared/dto/common.query';
import { QueryPaginationDto } from 'src/shared/dto/pagination.query';
import type { FetchResult } from 'src/utils/paginate';

import { UserJwtGuard } from '../auth/guards/user_jwt.guard';
import { RewardService } from './reward.service';

@ApiBearerAuth()
@UseGuards(UserJwtGuard)
@ApiTags('reward')
@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Get('history')
  async history(
    @GetUser('user') user: User,
    @Query() query: CommonQuery,
    @Query() pagination: QueryPaginationDto,
  ): Promise<FetchResult<Reward>> {
    return await this.rewardService.history(user, query, pagination);
  }
}
