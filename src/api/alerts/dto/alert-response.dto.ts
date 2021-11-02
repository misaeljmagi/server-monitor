import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Alert } from '../../../interfaces/alert.interface';
import { ServerType } from '../../../enums/ServerType';

export class ServerAlert implements Alert {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  server: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  created_at: string;

  @IsString()
  @ApiProperty()
  server_type: ServerType;
}

export class AlertsResponseDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ type: ServerAlert, isArray: true })
  alerts: ServerAlert[];

  @IsNumber()
  @ApiPropertyOptional()
  count?: number;
}
