import { Module } from '@nestjs/common';

import { ServicesModule } from '../services/services.module';
import { CrawlService } from './spin_to-earn.service';

@Module({
  imports: [ServicesModule],
  providers: [CrawlService],
})
export class WorkerModule {}
