import { PickType } from '@nestjs/swagger';

import { ArticleBaseDto } from '../article-base.dto';

export class ArticleResDto extends PickType(ArticleBaseDto, [
  '_id',
  'title',
  'content',
  'authorId',
  'tags',
  'createdAt',
  'updatedAt',
] as const) {}
