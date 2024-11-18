import { PartialType, PickType } from '@nestjs/swagger';

import { ArticleBaseDto } from '../article-base.dto';

export class UpdateArticleReqDto extends PickType(PartialType(ArticleBaseDto), [
  'title',
  'description',
  'body',
] as const) {}
