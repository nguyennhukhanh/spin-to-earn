import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSession } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(UserSession)
    private readonly userSessionRepository: Repository<UserSession>,
  ) {}

  async createUserSession(options: Partial<UserSession>): Promise<UserSession> {
    const { id, user } = options;
    let userSessionExist: UserSession;

    if (user) {
      userSessionExist = await this.userSessionRepository
        .createQueryBuilder('userSession')
        .where('userSession.user = :user', { user: options.user.id })
        .getOne();
    } else {
      userSessionExist = await this.userSessionRepository
        .createQueryBuilder('userSession')
        .where('userSession.id = :id', { id })
        .innerJoinAndSelect('userSession.user', 'user')
        .getOne();
    }

    if (userSessionExist) {
      await this.deleteUserSession({
        id: userSessionExist.id,
      });
    }

    if (id) {
      options.user = userSessionExist.user;
      delete options.id;
    }

    const userSession = this.userSessionRepository.create(options);
    return await this.userSessionRepository.save(userSession);
  }

  async deleteUserSession(options: Partial<UserSession>): Promise<boolean> {
    const { affected } = await this.userSessionRepository.delete(options);
    return affected > 0;
  }
}
