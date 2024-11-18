import { QueryArticleReqDto } from '../req/query-article.req.dto';
import { ArticleResDto } from './article.res.dto';

export class ArticleListResDto extends QueryArticleReqDto {
  articles: ArticleResDto[];
  total: number;
}
