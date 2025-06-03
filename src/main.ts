import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Setting global path prefix
  app.setGlobalPrefix('api/v2');
  // Setting Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      // Removes the extra fields sent throughout the request
      // Just keeps the ones on the DTO
      whitelist: true,
      // Emits an error when there are extra fields on a request
      // Indicates which property is not part of the DTO
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        // Excludes fields that are undefined on the request
        exposeUnsetFields: false,
        // Enables implicit conversion for DTO's
        enableImplicitConversion: true,
      },
    }),
  );
  // Listening on port
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
