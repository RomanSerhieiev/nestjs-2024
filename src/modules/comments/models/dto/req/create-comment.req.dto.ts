import { PickType } from '@nestjs/swagger';

import { CommentBaseDto } from '../comment-base.dto';

export class CreateCommentReqDto extends PickType(CommentBaseDto, [
  'content',
  'authorId',
  'articleId',
] as const) {}
