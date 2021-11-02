import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ServerType } from '../../../enums/ServerType';
import { Server } from '../../../interfaces/server.interface';

export class ServersResponseDto implements Server {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  type: ServerType;
}
