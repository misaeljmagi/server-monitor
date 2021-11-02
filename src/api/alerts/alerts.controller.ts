import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateAlertRequestDto } from './dto/create-alert-request.dto';
import { AlertsResponseDto, ServerAlert } from './dto/alert-response.dto';
import { AlertsService } from './alerts.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AlertQuery } from '../../types/AlertQueryType';

@ApiTags('Alerts')
@Controller('/alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Get('')
  @ApiOperation({
    summary: 'Get alerts',
    description: 'Gets all alerts or filtered alerts if given a query',
  })
  @ApiQuery({ name: 'description', type: String, required: false })
  @ApiQuery({ name: 'server', type: String, required: false })
  @ApiQuery({ name: 'take', type: Number, required: false })
  @ApiQuery({ name: 'skip', type: Number, required: false })
  getAlerts(@Query() query: AlertQuery): Promise<AlertsResponseDto> {
    return this.alertsService.getAlerts(query);
  }

  @Post('')
  @ApiOperation({
    summary: 'Add alert',
    description: 'Adds a new alert',
  })
  addAlert(@Body() payload: CreateAlertRequestDto): Promise<ServerAlert> {
    return this.alertsService.addAlert(payload);
  }
}
