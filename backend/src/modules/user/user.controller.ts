import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StellaResponse } from 'src/common/decorators/stella_response.decorator';
import { GetUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/database/entities';

import { UserJwtGuard } from '../auth/guards/user_jwt.guard';
import { UserResponse } from './dto/user.response';
import { UpdateUserInfoDto } from './dto/user.update';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @StellaResponse(200, UserResponse)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user info' })
  @Get()
  @UseGuards(UserJwtGuard)
  async getMe(@GetUser() user: User): Promise<User> {
    return user;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user info' })
  @Patch()
  @UseGuards(UserJwtGuard)
  async updateItem(
    @GetUser('user') user: User,
    @Body() dto: UpdateUserInfoDto,
  ): Promise<boolean> {
    return await this.userService.updateItem(user, dto);
  }
}
