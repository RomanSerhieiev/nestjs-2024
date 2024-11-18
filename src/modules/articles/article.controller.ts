import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConflictResponse, ApiTags } from '@nestjs/swagger';

import { ArticleID } from '../../database/entities/types/id.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../users/models/interfaces/user-data.interface';
import { CreateArticleReqDto } from './models/dto/req/create-article.req.dto';
import { QueryArticleReqDto } from './models/dto/req/query-article.req.dto';
import { UpdateArticleReqDto } from './models/dto/req/update-article.req.dto';
import { ArticleResDto } from './models/dto/res/article.res.dto';
import { ArticleListResDto } from './models/dto/res/article-list.res.dto';
import { ArticleService } from './services/article.service';

@ApiBearerAuth()
@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articlesService: ArticleService) {}

  @ApiConflictResponse({ description: 'Conflict' })
  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateArticleReqDto,
  ): Promise<ArticleResDto> {
    return await this.articlesService.create(userData.userId, dto);
  }

  // @SkipAuth()
  @Get()
  public async findAll(
    @CurrentUser() userData: IUserData,
    @Query() query: QueryArticleReqDto,
  ): Promise<ArticleListResDto> {
    return await this.articlesService.findAll(userData.userId, query);
  }

  // @SkipAuth()
  @Get(':articleId')
  public async findOne(
    @CurrentUser() userData: IUserData,
    @Param('articleId', ParseUUIDPipe) articleId: ArticleID,
  ): Promise<ArticleResDto> {
    return await this.articlesService.findOne(userData.userId, articleId);
  }

  @Patch(':articleId')
  public async update(
    @CurrentUser() userData: IUserData,
    @Param('articleId', ParseUUIDPipe) articleId: ArticleID,
    @Body() dto: UpdateArticleReqDto,
  ): Promise<ArticleResDto> {
    return await this.articlesService.update(userData.userId, articleId, dto);
  }

  @Delete(':articleId')
  public async remove(
    @CurrentUser() userData: IUserData,
    @Param('articleId', ParseUUIDPipe) articleId: ArticleID,
  ): Promise<void> {
    //TODO remove
    await this.articlesService.remove(userData.userId, articleId);
  }

  @Post(':articleId/like')
  public async like(
    @CurrentUser() userData: IUserData,
    @Param('articleId', ParseUUIDPipe) articleId: ArticleID,
  ): Promise<void> {
    await this.articlesService.like(userData.userId, articleId);
  }

  @Delete(':articleId/like')
  public async unlike(
    @CurrentUser() userData: IUserData,
    @Param('articleId', ParseUUIDPipe) articleId: ArticleID,
  ): Promise<void> {
    await this.articlesService.unlike(userData.userId, articleId);
  }
}
