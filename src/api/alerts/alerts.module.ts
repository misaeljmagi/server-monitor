import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertEntity } from '../../entities/alert.entity';
import { ServerEntity } from '../../entities/server.entity';
import { AlertsController } from './alerts.controller';
import { AlertsService } from './alerts.service';

@Module({
  imports: [TypeOrmModule.forFeature([AlertEntity, ServerEntity])],
  controllers: [AlertsController],
  providers: [AlertsService],
})
export class AlertsModule {}
