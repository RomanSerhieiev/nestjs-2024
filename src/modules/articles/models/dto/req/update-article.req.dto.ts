import { PickType } from '@nestjs/swagger';

import { ArticleBaseDto } from '../article-base.dto';

export class UpdateArticleReqDto extends PickType(ArticleBaseDto, [
  'title',
  'content',
  'tags',
] as const) {}
