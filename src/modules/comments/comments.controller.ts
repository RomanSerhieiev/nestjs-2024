import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConflictResponse, ApiTags } from '@nestjs/swagger';

import { CreateCommentReqDto } from './models/dto/req/create-comment.req.dto';
import { UpdateCommentReqDto } from './models/dto/req/update-comment.req.dto';
import { CommentResDto } from './models/dto/res/comment.res.dto';
import { CommentsService } from './services/comments.service';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth()
  @ApiConflictResponse({ description: 'Conflict' })
  @Post()
  public async create(
    @Body() dto: CreateCommentReqDto,
  ): Promise<CommentResDto> {
    return await this.commentsService.create(dto);
  }

  @Get()
  public async findAll(): Promise<CommentResDto> {
    return await this.commentsService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<CommentResDto> {
    return await this.commentsService.findOne(+id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdateCommentReqDto,
  ): Promise<CommentResDto> {
    return await this.commentsService.update(+id, dto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<CommentResDto> {
    return await this.commentsService.remove(+id);
  }
}
