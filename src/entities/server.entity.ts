import { ServerType } from 'src/enums/ServerType';
import { Server } from '../interfaces/server.interface';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Alert } from 'src/interfaces/alert.interface';
import { AlertEntity } from './alert.entity';

@Entity()
export class ServerEntity implements Server {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  name: string;

  @Column({ type: 'enum', enum: ServerType, nullable: true })
  type: ServerType;

  @OneToMany(() => AlertEntity, (alert) => alert.server, {
    onDelete: 'CASCADE',
  })
  alerts: Alert[];

  @CreateDateColumn()
  created_at: Date;
}
