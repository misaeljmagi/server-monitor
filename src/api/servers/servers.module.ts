import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertEntity } from 'src/entities/alert.entity';
import { ServerEntity } from '../../entities/server.entity';
import { ServersController } from './servers.controller';
import { ServersService } from './servers.service';

@Module({
  imports: [TypeOrmModule.forFeature([AlertEntity, ServerEntity])],
  controllers: [ServersController],
  providers: [ServersService],
})
export class ServersModule {}
