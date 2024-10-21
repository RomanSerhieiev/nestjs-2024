import { PickType } from '@nestjs/swagger';

import { CommentBaseDto } from '../comment-base.dto';

export class CommentResDto extends PickType(CommentBaseDto, [
  '_id',
  'content',
  'authorId',
  'articleId',
  'createdAt',
  'updatedAt',
] as const) {}
