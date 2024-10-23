import { Injectable } from '@nestjs/common';

import { CreateArticleReqDto } from '../models/dto/req/create-article.req.dto';
import { UpdateArticleReqDto } from '../models/dto/req/update-article.req.dto';
import { ArticleResDto } from '../models/dto/res/article.res.dto';

@Injectable()
export class ArticlesService {
  public async create(dto: CreateArticleReqDto): Promise<ArticleResDto> {
    return 'This action adds a new article' as unknown as ArticleResDto;
  }

  public async findAll(): Promise<ArticleResDto> {
    return `This action returns all articles` as unknown as ArticleResDto;
  }

  public async findOne(id: number): Promise<ArticleResDto> {
    return `This action returns a #${id} article` as unknown as ArticleResDto;
  }

  public async update(
    id: number,
    dto: UpdateArticleReqDto,
  ): Promise<ArticleResDto> {
    return `This action updates a #${id} article` as unknown as ArticleResDto;
  }

  public async remove(id: number): Promise<ArticleResDto> {
    return `This action removes a #${id} article` as unknown as ArticleResDto;
  }
}
