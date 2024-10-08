import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './app.module';
import {
  rateLimit,
  setupSwagger,
  validateEnvironmentVariables,
} from './utils/init';

// Set the timezone to UTC
process.env.TZ = 'Etc/Universal';

// Set the number of threads used in libuv's threadpool to size threads
// DOCS: https://nodejs.org/api/cli.html#uv_threadpool_sizesize
// ISSUE: https://github.com/googleapis/google-api-nodejs-client/issues/761#issuecomment-311251914
process.env.UV_THREADPOOL_SIZE = '128';

async function bootstrap() {
  validateEnvironmentVariables();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    bufferLogs: true,
  });

  const logger = new Logger('spin-to-earn');
  const configService = app.get(ConfigService);

  app.set('trust proxy', true);
  app.setGlobalPrefix(configService.get('main.apiPrefix'));

  setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.use(helmet());
  app.use(compression());
  app.use(rateLimit);

  const port = configService.get('main.port') ?? 1410;
  await app.listen(port);
  logger.log(`App is running on port ${port}!`);
}

bootstrap();
