import { Controller, Get } from '@nestjs/common';
import { StellaResponse } from 'src/common/decorators/stella_response.decorator';

import { HealthResponse } from './health.response';

@Controller('health')
export class HealthController {
  @StellaResponse(200, HealthResponse)
  @Get()
  async base(): Promise<string> {
    return 'The application is up and running!';
  }
}
