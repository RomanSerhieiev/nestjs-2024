import { Injectable } from '@nestjs/common';

import { CreateCommentReqDto } from '../models/dto/req/create-comment.req.dto';
import { UpdateCommentReqDto } from '../models/dto/req/update-comment.req.dto';
import { CommentResDto } from '../models/dto/res/comment.res.dto';

@Injectable()
export class CommentsService {
  public async create(dto: CreateCommentReqDto): Promise<CommentResDto> {
    return 'This action adds a new comment' as unknown as CommentResDto;
  }

  public async findAll(): Promise<CommentResDto> {
    return `This action returns all comments` as unknown as CommentResDto;
  }

  public async findOne(id: number): Promise<CommentResDto> {
    return `This action returns a #${id} comment` as unknown as CommentResDto;
  }

  public async update(
    id: number,
    dto: UpdateCommentReqDto,
  ): Promise<CommentResDto> {
    return `This action updates a #${id} comment` as unknown as CommentResDto;
  }

  public async remove(id: number): Promise<CommentResDto> {
    return `This action removes a #${id} comment` as unknown as CommentResDto;
  }
}
