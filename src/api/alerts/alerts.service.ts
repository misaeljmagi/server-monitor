/* eslint class-methods-use-this: 0 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlertEntity } from '../../entities/alert.entity';
import { ServerEntity } from '../../entities/server.entity';
import { Repository } from 'typeorm';
import { CreateAlertRequestDto } from './dto/create-alert-request.dto';
import { AlertsResponseDto, ServerAlert } from './dto/alert-response.dto';
import * as moment from 'moment';
import { AlertQuery } from 'src/types/AlertQueryType';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(AlertEntity)
    private readonly alertRepository: Repository<AlertEntity>,
    @InjectRepository(ServerEntity)
    private readonly serverRepository: Repository<ServerEntity>,
  ) {}
  async getAlerts(query: AlertQuery): Promise<AlertsResponseDto> {
    const { description, server, take = 5, skip } = query;

    let filter;

    if (description) {
      filter = { description };
    }
    if (server) {
      filter = { server: { name: server } };
    }

    const [alerts, count] = await this.alertRepository.findAndCount({
      relations: ['server'],
      where: filter,
      take,
      skip,
    });

    return { alerts: alerts.map(this.alertDtoBuilder), count };
  }

  async addAlert(payload: CreateAlertRequestDto): Promise<ServerAlert> {
    const { server_id, description } = payload;

    const server = await this.serverRepository.findOne({ id: server_id });

    if (!server) {
      throw new NotFoundException(`Server with id ${server_id} not found!`);
    }

    const alert = new AlertEntity();

    alert.description = description;
    alert.server = server;

    await this.alertRepository.save(alert);

    return this.alertDtoBuilder(alert);
  }

  private alertDtoBuilder(alert: AlertEntity) {
    return {
      description: alert.description,
      server: alert.server.name,
      server_type: alert.server.type,
      created_at: moment(alert.created_at).format('hh:mm:ss DD-MM-YYYY'),
    };
  }
}
