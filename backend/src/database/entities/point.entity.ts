import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseTime } from './base/time.entity';
import { User } from './user.entity';

@Entity()
export class Point extends BaseTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0 })
  amount: number;

  @ManyToOne(() => User, (user) => user.points, { onDelete: 'CASCADE' })
  user: User;
}
