import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { User } from 'src/database/entities';
import { Ticket } from 'src/database/entities';
import { Repository } from 'typeorm';

import type { CreateTicketDto } from './dto/ticket.create';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async buyTicket(user: User, dto: CreateTicketDto): Promise<boolean> {
    try {
      const ticketExist = await this.ticketRepository
        .createQueryBuilder('ticket')
        .innerJoin('ticket.user', 'user')
        .select(['ticket.id', 'ticket.amount'])
        .getOne();

      if (ticketExist) {
        ticketExist.amount += dto.amount;
        await this.ticketRepository.update(ticketExist.id, {
          amount: ticketExist.amount,
        });
        return true;
      } else {
        await this.ticketRepository.save({
          user,
          ...dto,
        });

        return true;
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getTotalTicket(user: User): Promise<{ totalTicket: number }> {
    return await this.ticketRepository
      .createQueryBuilder('ticket')
      .innerJoin('ticket.user', 'user')
      .select('SUM(ticket.amount)', 'totalTicket')
      .where('user.id = :id', { id: user.id })
      .getRawOne();
  }
}
