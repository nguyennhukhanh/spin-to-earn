import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StellaResponse } from 'src/common/decorators/stella_response.decorator';
import { GetUser } from 'src/common/decorators/user.decorator';
import type { TokensType } from 'src/shared/types';
import { JwtPayloadType } from 'src/shared/types';

import { AuthHelperService } from './auth_helper.service';
import { CreateWalletDto } from './dto/wallet.create';
import { NonceResponse, WalletValidateResponse } from './dto/wallet.response';
import { WalletValidateDto } from './dto/wallet.validate';
import { UserJwtRefreshTokenGuard } from './guards/user_jwt_refresh_token.guard';
import { WalletService } from './wallet.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authHelperService: AuthHelperService,
    private readonly walletService: WalletService,
  ) {}

  @ApiOperation({ summary: 'Logout as user. Please use refresh token' })
  @ApiBearerAuth()
  @Get('logout')
  @UseGuards(UserJwtRefreshTokenGuard)
  async logoutAsUser(@GetUser('session') session: string): Promise<boolean> {
    return await this.authHelperService.logoutAsUser(session);
  }

  @ApiOperation({ summary: 'Refresh token as user. Please use refresh token' })
  @ApiBearerAuth()
  @Get('refresh-token')
  @UseGuards(UserJwtRefreshTokenGuard)
  async refreshTokenAsUser(
    @GetUser() user: JwtPayloadType,
  ): Promise<TokensType> {
    return await this.authHelperService.refreshTokenAsUser(user);
  }

  @StellaResponse(201, WalletValidateResponse)
  @ApiOperation({ summary: 'Login as user with wallet' })
  @Post('login/wallet')
  async loginAsUserWithWallet(@Body() dto: WalletValidateDto) {
    return await this.walletService.loginAsUserWithWallet(dto);
  }

  @StellaResponse(201, NonceResponse)
  @ApiOperation({ summary: 'Get nonce for wallet' })
  @Post('nonce')
  async getNonce(@Body() dto: CreateWalletDto) {
    return await this.walletService.getNonce(dto.walletAddress);
  }
}
