import { Module } from '@nestjs/common';

import { RedisService } from './services/redis.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'REDIS',
      useClass: RedisService,
    },
  ],
  exports: [],
})
export class RedisModule {}
