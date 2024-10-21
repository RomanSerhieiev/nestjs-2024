import { PickType } from '@nestjs/swagger';

import { CommentBaseDto } from '../comment-base.dto';

export class UpdateCommentReqDto extends PickType(CommentBaseDto, [
  'content',
] as const) {}
