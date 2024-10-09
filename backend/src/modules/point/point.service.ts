import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point, type User } from 'src/database/entities';
import type { CommonQuery } from 'src/shared/dto/common.query';
import type { QueryPaginationDto } from 'src/shared/dto/pagination.query';
import type { FetchResult } from 'src/utils/paginate';
import { FetchType, paginateEntities } from 'src/utils/paginate';
import { Repository } from 'typeorm';

import type { CreatePointDto } from './dto/point.create';

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>,
  ) {}

  async setPoint(user: User, dto: CreatePointDto): Promise<Point> {
    const point = await this.pointRepository.save({
      user,
      ...dto,
    });

    return {
      ...point,
      user: undefined,
    };
  }

  async getTotalPoint(user: User): Promise<{ totalPoint: number }> {
    return await this.pointRepository
      .createQueryBuilder('point')
      .innerJoin('point.user', 'user')
      .select('SUM(point.amount)', 'totalPoint')
      .where('user.id = :id', { id: user.id })
      .getRawOne();
  }

  async history(
    user?: User,
    query?: CommonQuery,
    pagination?: QueryPaginationDto,
  ): Promise<FetchResult<Point>> {
    try {
      const { search, fromDate, toDate, sort } = query;

      const queryBuilder = this.pointRepository
        .createQueryBuilder('point')
        .innerJoin('point.user', 'user')
        .select(['point.id', 'point.amount', 'point.createdAt']);

      const conditions = [
        {
          condition: search,
          query:
            '(user.fullName LIKE :search OR user.walletAddress LIKE :search)',
          param: { search: `%${search}%` },
        },
        {
          condition: user.walletAddress,
          query: '(user.walletAddress LIKE :walletAddress)',
          param: { walletAddress: `%${user.walletAddress}%` },
        },
        {
          condition: fromDate,
          query: 'point.createdAt >= :fromDate',
          param: { fromDate },
        },
        {
          condition: toDate,
          query: 'point.createdAt <= :toDate',
          param: { toDate },
        },
      ];

      conditions.forEach(({ condition, query, param }) => {
        if (condition) {
          queryBuilder.andWhere(query, param);
        }
      });

      if (sort) {
        queryBuilder.orderBy(`point.createdAt`, sort);
      }

      return await paginateEntities<Point>(
        queryBuilder,
        pagination,
        FetchType.MANAGED,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
