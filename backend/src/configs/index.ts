import type { ConfigFactory } from '@nestjs/config';
import type { ClassConstructor } from 'class-transformer';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { AdminAuthConfig } from './admin_auth.config';
import adminAuth from './admin_auth.config';
import { DatabaseConfig } from './database.config';
import database from './database.config';
import { MainConfig } from './main.config';
import main from './main.config';
import { RedisConfig } from './redis.config';
import redis from './redis.config';
import { UserAuthConfig } from './user_auth.config';
import userAuth from './user_auth.config';

async function validateConfig<T extends object>(
  configClass: ClassConstructor<T>,
  config: NodeJS.ProcessEnv,
) {
  const configInstance = plainToClass(configClass, config);
  try {
    await validateOrReject(configInstance);
  } catch (errors) {
    throw new Error(
      `${configClass.name} config validation failed!\nSuggestion: ${errors}`,
    );
  }
}

export async function validateAllConfigs() {
  await Promise.all([
    validateConfig(MainConfig, process.env),
    validateConfig(DatabaseConfig, process.env),
    validateConfig(RedisConfig, process.env),
    validateConfig(AdminAuthConfig, process.env),
    validateConfig(UserAuthConfig, process.env),
  ]);
}

export const load: ConfigFactory[] = [
  main,
  database,
  redis,
  adminAuth,
  userAuth,
];

export type StellaConfig = {
  main: MainConfig;
  database: DatabaseConfig;
  redis: RedisConfig;
  adminAuth: AdminAuthConfig;
  userAuth: UserAuthConfig;
};
