import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiConflictResponse, ApiTags } from '@nestjs/swagger';

import { CreateCommentReqDto } from './models/dto/req/create-comment.req.dto';
import { UpdateCommentReqDto } from './models/dto/req/update-comment.req.dto';
import { CommentResDto } from './models/dto/res/comment.res.dto';
import { CommentService } from './services/comment.service';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentsService: CommentService) {}

  @ApiBearerAuth()
  @ApiConflictResponse({ description: 'Conflict' })
  @Post()
  public async create(@Body() dto: CreateCommentReqDto): Promise<CommentResDto> {
    return await this.commentsService.create(dto);
  }

  @Get()
  public async findAll(): Promise<CommentResDto> {
    return await this.commentsService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<CommentResDto> {
    return await this.commentsService.findOne(+id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCommentReqDto,
  ): Promise<CommentResDto> {
    return await this.commentsService.update(+id, dto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  public async remove(@Param('id', ParseUUIDPipe) id: string): Promise<CommentResDto> {
    return await this.commentsService.remove(+id);
  }
}
