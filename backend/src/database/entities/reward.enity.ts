import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BaseTime } from './base/time.entity';

@Entity()
export class Reward extends BaseTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint', nullable: false })
  points: number;

  @Column({ length: 50, nullable: false })
  reward: string;

  @Column({ length: 100, nullable: false })
  fromAddress: string;

  @Column({ length: 100, nullable: false })
  toAddress: string;

  @Column({ type: 'timestamp' })
  blockTimestamp: Date;

  @Column({ length: 20, nullable: false })
  blockNumber: string;

  @Column({ length: 255, nullable: false })
  transactionHash: string;
}
