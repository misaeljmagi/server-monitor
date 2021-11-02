import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Alert } from '../../../interfaces/alert.interface';

export class CreateAlertRequestDto implements Alert {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  server_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}
