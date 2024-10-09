import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from 'src/database/entities';

import { PointController } from './point.controller';
import { PointService } from './point.service';

@Module({
  imports: [TypeOrmModule.forFeature([Point])],
  providers: [PointService],
  controllers: [PointController],
})
export class PointModule {}
