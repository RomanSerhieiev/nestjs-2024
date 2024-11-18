import { PickType } from '@nestjs/swagger';

import { ArticleBaseDto } from '../article-base.dto';

export class CreateArticleReqDto extends PickType(ArticleBaseDto, [
  'title',
  'description',
  'body',
  'tags',
] as const) {}
