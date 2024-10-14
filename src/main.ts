import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('NestJS 2024')
    .setDescription('NestJS 2024 API description')
    .setVersion('1.0')
    .addBearerAuth({
      in: 'header',
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelsExpandDepth: 8,
      persistAuthorization: true,
    },
  });

  const PORT = 3000;
  const HOST = 'localhost';

  await app.listen(PORT, () => {
    console.log(`Server: http://${HOST}:${PORT}`);
    console.log(`Swagger: http://${HOST}:${PORT}/docs`);
  });
}

void bootstrap();
