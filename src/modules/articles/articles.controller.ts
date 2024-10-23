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

import { CreateArticleReqDto } from './models/dto/req/create-article.req.dto';
import { UpdateArticleReqDto } from './models/dto/req/update-article.req.dto';
import { ArticleResDto } from './models/dto/res/article.res.dto';
import { ArticlesService } from './services/articles.service';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiBearerAuth()
  @ApiConflictResponse({ description: 'Conflict' })
  @Post()
  public async create(
    @Body() dto: CreateArticleReqDto,
  ): Promise<ArticleResDto> {
    return await this.articlesService.create(dto);
  }

  @Get()
  public async findAll(): Promise<ArticleResDto> {
    return await this.articlesService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<ArticleResDto> {
    return await this.articlesService.findOne(+id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdateArticleReqDto,
  ): Promise<ArticleResDto> {
    return await this.articlesService.update(+id, dto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<ArticleResDto> {
    return await this.articlesService.remove(+id);
  }
}
