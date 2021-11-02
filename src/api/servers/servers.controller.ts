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
