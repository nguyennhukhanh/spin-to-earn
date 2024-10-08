import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { BaseTime } from './base/time.entity';

@Index(['walletAddress'], { unique: true })
@Entity()
export class User extends BaseTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  walletAddress: string;

  @Column({ type: 'int', default: 0 })
  nonce: number;

  @Column({ length: 100, nullable: true })
  fullName: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
