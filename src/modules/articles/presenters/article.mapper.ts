import { ArticleEntity } from '../../../database/entities/article.entity';
import { UserMapper } from '../../users/presenters/user.mapper';
import { QueryArticleReqDto } from '../models/dto/req/query-article.req.dto';
import { ArticleResDto } from '../models/dto/res/article.res.dto';
import { ArticleListResDto } from '../models/dto/res/article-list.res.dto';

export class ArticleMapper {
  public static toResDto(article: ArticleEntity): ArticleResDto {
    return {
      id: article.id,
      title: article.title,
      description: article.description,
      body: article.body,
      created: article.created,
      updated: article.updated,
      tags: article.tags ? article.tags.map((tag) => tag.name) : [],
      author: article.user ? UserMapper.toResDto(article.user) : null,
      isLiked: !!article.likes?.length,
    };
  }

  public static toResDtoList(
    articles: ArticleEntity[],
    total: number,
    query: QueryArticleReqDto,
  ): ArticleListResDto {
    return { articles: articles.map(this.toResDto), total, ...query };
  }
}
