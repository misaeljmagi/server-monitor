/* eslint-disable @typescript-eslint/no-var-requires */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

require('dotenv').config();

const { PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder().setTitle('Server Monitor').build();

  SwaggerModule.setup('/docs', app, SwaggerModule.createDocument(app, options));

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(PORT || 3000);
}
bootstrap();
