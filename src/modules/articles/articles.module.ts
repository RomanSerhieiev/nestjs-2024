import { Module } from '@nestjs/common';

import { ArticlesController } from './articles.controller';
import { ArticlesService } from './services/articles.service';

@Module({
  imports: [],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [],
})
export class ArticlesModule {}
