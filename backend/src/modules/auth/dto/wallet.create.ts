import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
import { IsAddress } from 'src/common/decorators/is_address.decorator';

export class CreateWalletDto {
  @ApiProperty({ minLength: 6, required: true })
  @IsNotEmpty()
  @MinLength(6)
  @IsAddress()
  walletAddress: string;
}
