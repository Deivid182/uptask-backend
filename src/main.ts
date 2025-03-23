import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { envs } from './config';
import { ResponseInterceptor } from './common/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = new Reflector();

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || envs.ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'), false);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(envs.PORT);
}
bootstrap();
