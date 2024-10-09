import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/database/entities';

import { UserJwtGuard } from '../auth/guards/user_jwt.guard';
import { CreateTicketDto } from './dto/ticket.create';
import { TicketService } from './ticket.service';

@ApiBearerAuth()
@UseGuards(UserJwtGuard)
@ApiTags('ticket')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('buy')
  async buyTicket(
    @GetUser('user') user: User,
    @Body() dto: CreateTicketDto,
  ): Promise<boolean> {
    return await this.ticketService.buyTicket(user, dto);
  }

  @Get('total')
  async getTotalTicket(
    @GetUser('user') user: User,
  ): Promise<{ totalTicket: number }> {
    return await this.ticketService.getTotalTicket(user);
  }
}
