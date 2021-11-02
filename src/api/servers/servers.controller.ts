import { Body, Controller, Get, Post } from '@nestjs/common';

import { ServersService } from './servers.service';
import { CreateServerRequestDto } from './dto/create-server-request.dto';
import { ServersResponseDto } from './dto/server-response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Servers')
@Controller('/servers')
export class ServersController {
  constructor(private readonly serversService: ServersService) {}

  @Get('')
  @ApiOperation({
    summary: 'Get servers',
    description: 'Returns all servers',
  })
  getAllServers(): Promise<ServersResponseDto[]> {
    return this.serversService.getAllServers();
  }

  @Get('/top-failing')
  @ApiOperation({
    summary: 'Get top failing servers',
    description: 'Gets top 3 servers with the most alerts',
  })
  getTopFailingServers(): Promise<
    ServersResponseDto & { alertCount: number }[]
  > {
    return this.serversService.getTopFailingServers();
  }

  @Post('')
  @ApiOperation({
    summary: 'Add server',
    description: 'Adds a new server',
  })
  addServer(
    @Body() payload: CreateServerRequestDto,
  ): Promise<ServersResponseDto> {
    return this.serversService.addServer(payload);
  }
}
