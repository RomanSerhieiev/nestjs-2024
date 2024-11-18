import { PickType } from '@nestjs/swagger';

import { ArticleBaseDto } from '../article-base.dto';

export class ArticleResDto extends PickType(ArticleBaseDto, [
  'id',
  'title',
  'description',
  'body',
  'created',
  'updated',
  'author',
  'tags',
  'isLiked',
] as const) {}
