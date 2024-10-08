import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities';
import { Repository } from 'typeorm';

import type { UpdateUserInfoDto } from './dto/user.update';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async updateItem(user: User, dto: UpdateUserInfoDto): Promise<boolean> {
    const { affected } = await this.userRepository.update({ id: user.id }, dto);
    return affected > 0;
  }
}
