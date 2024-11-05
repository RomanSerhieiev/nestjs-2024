import { Module } from '@nestjs/common';

import { CommentController } from './comment.controller';
import { CommentService } from './services/comment.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
