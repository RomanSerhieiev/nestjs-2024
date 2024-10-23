export type Config = {
  app: AppConfig;
  postgres: PostgresConfig;
  redis: RedisConfig;
  aws: AwsConfig;
  sentry: SentryConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};

export type PostgresConfig = {
  port: number;
  host: string;
  user: string;
  password: string;
  name: string;
};

export type RedisConfig = {
  port: number;
  host: string;
  password: string;
};

export type AwsConfig = {
  accessKey: string;
  secretKey: string;
};

export type SentryConfig = {
  dsn: string;
  env: string;
  debug: boolean;
};
