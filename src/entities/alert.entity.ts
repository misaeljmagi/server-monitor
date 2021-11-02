import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Alert } from '../interfaces/alert.interface';
import { ServerEntity } from './server.entity';

@Entity()
export class AlertEntity implements Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: true })
  description: string;

  @ManyToOne(() => ServerEntity, (server) => server.alerts)
  server: ServerEntity;

  @CreateDateColumn()
  created_at: Date;
}
