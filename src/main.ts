import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');


  app.enableCors({
    origin: 'http://localhost:4200',  
    credentials: true,                
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS Tutorial')
    .setDescription('This is a blog series tutorial.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
