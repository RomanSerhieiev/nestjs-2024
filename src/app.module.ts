import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ArticleModule } from './modules/articles/article.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommentModule } from './modules/comments/comment.module';
import { AppConfigModule } from './modules/config/conig.module';
import { HealthModule } from './modules/health/health.module';
import { LoggerModule } from './modules/logger/logger.module';
import { PostgresModule } from './modules/postgres/postgres.module';
import { RedisModule } from './modules/redis/redis.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { TagModule } from './modules/tags/tag.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    AppConfigModule,
    LoggerModule,
    PostgresModule,
    RedisModule,
    RepositoryModule,

    ArticleModule,
    AuthModule,
    CommentModule,
    HealthModule,
    TagModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
  exports: [],
})
export class AppModule {}
