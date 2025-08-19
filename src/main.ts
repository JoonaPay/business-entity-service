import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Setup Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Business Entity Management Service')
    .setDescription('A comprehensive API for managing business entities, members, roles, and invitations')
    .setVersion('1.0.0')
    .addTag('business-entities', 'Business entity management operations')
    .addTag('business-members', 'Business member management operations')
    .addTag('business-roles', 'Business role management operations')
    .addTag('business-invitations', 'Business invitation management operations')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation is available at: http://localhost:${port}/api/docs`);
}

bootstrap();