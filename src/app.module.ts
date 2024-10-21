import { Module } from '@nestjs/common';

import { ArticlesModule } from './modules/articles/articles.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommentsModule } from './modules/comments/comments.module';
import { AppConfigModule } from './modules/config/conig.module';
import { HealthModule } from './modules/health/health.module';
import { PostgresModule } from './modules/postgres/postgres.module';
import { RedisModule } from './modules/redis/redis.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    AppConfigModule,
    PostgresModule,
    RedisModule,
    UsersModule,
    ArticlesModule,
    CommentsModule,
    HealthModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
