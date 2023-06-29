import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('TRUE GLOBAL task manager')
    .setDescription('Task manager for manage company personal')
    .setVersion('1.0')
    .addTag('trueglobal')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  app.enableCors();

  const maxRetryAttempts = 5;
  let currentAttempt = 1;
  let dbConnected = false;

  while (currentAttempt <= maxRetryAttempts && !dbConnected) {
    try {
      await app.listen(5500);
      dbConnected = true;
    } catch (error) {
      console.log(
        `Database connection failed (attempt ${currentAttempt} of ${maxRetryAttempts}), retrying...`,
      );
      await new Promise((resolve) => setTimeout(resolve, 3000));
      currentAttempt++;
    }
  }

  if (dbConnected) {
    console.log('Server has started on PORT 5500');
  } else {
    console.log('Failed to connect to the database. Exiting...');
    process.exit(1);
  }
}

bootstrap();
