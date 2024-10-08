import { registerAs } from '@nestjs/config';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class MainConfig {
  @IsNotEmpty()
  @IsNumber()
  port: number;

  @IsNotEmpty()
  @IsNumber()
  workerPort: number;

  @IsNotEmpty()
  @IsBoolean()
  isProduction: boolean;

  @IsNotEmpty()
  @IsString()
  apiPrefix: string;

  @IsOptional()
  @IsString()
  workingDirectory?: string;

  @IsOptional()
  @IsNumber()
  apiKeyLifetime?: number;

  constructor() {
    this.port = Number(process.env.PORT);
    this.workerPort = Number(process.env.WORKER_PORT);
    this.isProduction = process.env.PRODUCTION === 'true';
    this.apiPrefix = process.env.API_PREFIX || 'api';
    this.workingDirectory = process.cwd();
    this.apiKeyLifetime = Number(process.env.API_KEY_LIFETIME);
  }
}

export default registerAs<MainConfig>('main', () => new MainConfig());
