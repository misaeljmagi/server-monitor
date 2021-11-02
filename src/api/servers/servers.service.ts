/* eslint class-methods-use-this: 0 */
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServerEntity } from '../../entities/server.entity';
import { Repository } from 'typeorm';
import { ServersResponseDto } from './dto/server-response.dto';
import { CreateServerRequestDto } from './dto/create-server-request.dto';
import { isEmpty } from 'lodash';

@Injectable()
export class ServersService {
  constructor(
    @InjectRepository(ServerEntity)
    private readonly serverRepository: Repository<ServerEntity>,
  ) {}
  async getAllServers(): Promise<ServersResponseDto[]> {
    return this.serverRepository.find();
  }

  async addServer(
    payload: CreateServerRequestDto,
  ): Promise<ServersResponseDto> {
    const { name, type } = payload;

    const server = await this.serverRepository.findOne({ name });

    if (!isEmpty(server)) {
      throw new ConflictException(
        `Server with name ${name} already exists! Server with id ${server.id}`,
      );
    }

    const newServer = new ServerEntity();

    newServer.name = name;
    newServer.type = type;

    return this.serverRepository.save(newServer);
  }
}
