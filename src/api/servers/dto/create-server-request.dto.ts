import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ServerType } from 'src/enums/ServerType';
import { Server } from '../../../interfaces/server.interface';

export class CreateServerRequestDto implements Server {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEnum(ServerType)
  @IsNotEmpty()
  @ApiProperty()
  type: ServerType;
}
