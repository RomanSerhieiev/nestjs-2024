import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

import { ArticleEntity } from '../../../database/entities/article.entity';
import { ArticleID, UserID } from '../../../database/entities/types/id.type';
import { QueryArticleReqDto } from '../../articles/models/dto/req/query-article.req.dto';

@Injectable()
export class ArticleRepository extends Repository<ArticleEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ArticleEntity, dataSource.manager);
  }

  public async findAll(
    userId: UserID,
    query: QueryArticleReqDto,
    manager: EntityManager,
  ): Promise<[ArticleEntity[], number]> {
    const qb = await this.getQb(userId, manager);

    if (query.search) {
      qb.andWhere('CONCAT(article.title, article.description) ILIKE :search', {
        search: `%${query.search}%`,
      });
    }

    if (query.tag) {
      qb.andWhere('tag.name = :tag', { tag: query.tag });
    }

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async findById(
    userId: UserID,
    articleId: ArticleID,
    manager: EntityManager,
  ): Promise<ArticleEntity> {
    const qb = await this.getQb(userId, manager);
    qb.where('article.id = :articleId', { articleId });

    return await qb.getOne();
  }

  private async getQb(
    userId: UserID,
    manager: EntityManager,
  ): Promise<SelectQueryBuilder<ArticleEntity>> {
    const articleRepository = manager.getRepository(ArticleEntity);
    const qb = articleRepository.createQueryBuilder('article');
    qb.setParameter('userId', userId);
    qb.leftJoinAndSelect('article.tags', 'tag');
    qb.leftJoinAndSelect('article.likes', 'like', 'like.userId = :userId');
    qb.leftJoinAndSelect('article.comments', 'comment');
    qb.leftJoinAndSelect('article.user', 'user');
    qb.leftJoinAndSelect('user.followers', 'follower', 'follower.followerId = :userId');

    return qb;
  }
}
