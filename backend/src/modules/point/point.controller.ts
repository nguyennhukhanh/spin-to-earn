import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/user.decorator';
import type { Point } from 'src/database/entities';
import { User } from 'src/database/entities';
import { CommonQuery } from 'src/shared/dto/common.query';
import { QueryPaginationDto } from 'src/shared/dto/pagination.query';
import type { FetchResult } from 'src/utils/paginate';

import { UserJwtGuard } from '../auth/guards/user_jwt.guard';
import { CreatePointDto } from './dto/point.create';
import { PointService } from './point.service';

@ApiBearerAuth()
@UseGuards(UserJwtGuard)
@ApiTags('point')
@Controller('point')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @Post()
  async setPoint(
    @GetUser('user') user: User,
    @Body() dto: CreatePointDto,
  ): Promise<Point> {
    return await this.pointService.setPoint(user, dto);
  }

  @Get('total')
  async getTotalPoint(
    @GetUser('user') user: User,
  ): Promise<{ totalPoint: number }> {
    return await this.pointService.getTotalPoint(user);
  }

  @Get('history')
  async history(
    @GetUser('user') user: User,
    @Query() query: CommonQuery,
    @Query() pagination: QueryPaginationDto,
  ): Promise<FetchResult<Point>> {
    return await this.pointService.history(user, query, pagination);
  }
}
