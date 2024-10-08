import { ApiProperty } from '@nestjs/swagger';

export class HealthResponse {
  @ApiProperty({ example: { code: 200, message: 'Successful' } })
  meta: object;

  @ApiProperty({ example: 'The application is up and running!' })
  data: string;
}
