import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerEntity } from '../../entities/server.entity';
import { ServersController } from './servers.controller';
import { ServersService } from './servers.service';

@Module({
  imports: [TypeOrmModule.forFeature([ServerEntity])],
  controllers: [ServersController],
  providers: [ServersService],
})
export class ServersModule {}
