import { PickType } from '@nestjs/swagger';

import { ArticleBaseDto } from '../article-base.dto';

export class CreateArticleReqDto extends PickType(ArticleBaseDto, [
  'title',
  'content',
  'authorId',
  'tags',
] as const) {}
