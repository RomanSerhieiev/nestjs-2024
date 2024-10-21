import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { Config, RedisConfig } from '../../../configs/config.type';

@Injectable()
export class RedisService {
  constructor(private readonly configService: ConfigService<Config>) {}

  createRedisOptions() {
    const redisConfig = this.configService.get<RedisConfig>('redis');
    return new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
      password: redisConfig.password,
    });
  }
}
