import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Min(1)
  @IsNumber()
  amount: number;
}
