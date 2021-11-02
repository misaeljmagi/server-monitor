/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlertsModule } from './api/alerts/alerts.module';
import { toNumber } from 'lodash';
import { ServersModule } from './api/servers/servers.module';

require('dotenv').config();

const {
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_HOST,
  DATABASE_NAME,
} = process.env;

@Module({
  imports: [
    AlertsModule,
    ServersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DATABASE_HOST,
      port: toNumber(DATABASE_PORT),
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
