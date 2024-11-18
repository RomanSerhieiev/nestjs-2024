import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, In } from 'typeorm';

import { ArticleEntity } from '../../../database/entities/article.entity';
import { TagEntity } from '../../../database/entities/tag.entity';
import { ArticleID, UserID } from '../../../database/entities/types/id.type';
import { ArticleRepository } from '../../repository/services/article.repository';
import { LikeRepository } from '../../repository/services/like.repository';
import { TagRepository } from '../../repository/services/tag.repository';
import { CreateArticleReqDto } from '../models/dto/req/create-article.req.dto';
import { QueryArticleReqDto } from '../models/dto/req/query-article.req.dto';
import { UpdateArticleReqDto } from '../models/dto/req/update-article.req.dto';
import { ArticleResDto } from '../models/dto/res/article.res.dto';
import { ArticleListResDto } from '../models/dto/res/article-list.res.dto';
import { ArticleMapper } from '../presenters/article.mapper';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly likeRepository: LikeRepository,
    private readonly tagRepository: TagRepository,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  public async create(userId: UserID, dto: CreateArticleReqDto): Promise<ArticleResDto> {
    return await this.entityManager.transaction('SERIALIZABLE', async (manager) => {
      const articleRepository = manager.getRepository(ArticleEntity);

      const tags = await this.createTags(dto.tags, manager);

      const article = await articleRepository.save(
        articleRepository.create({ ...dto, userId, tags }),
      );

      return ArticleMapper.toResDto(article);
    });
  }

  public async findAll(userId: UserID, query: QueryArticleReqDto): Promise<ArticleListResDto> {
    return await this.entityManager.transaction('REPEATABLE READ', async (manager) => {
      //TODO findAll - виводити всіх постів з їхніми коментарями, тегами, лайками
      const [articles, total] = await this.articleRepository.findAll(userId, query, manager);
      return ArticleMapper.toResDtoList(articles, total, query);
    });
  }

  public async findOne(userId: UserID, articleId: ArticleID): Promise<ArticleResDto> {
    return await this.entityManager.transaction('REPEATABLE READ', async (manager) => {
      //TODO findAll - виводити один пост з його коментарями, тегами, лайками
      const article = await this.articleRepository.findById(userId, articleId, manager);
      return ArticleMapper.toResDto(article);
    });
  }

  public async update(
    userId: UserID,
    articleId: ArticleID,
    dto: UpdateArticleReqDto,
  ): Promise<ArticleResDto> {
    const article = this.articleRepository.create();
    return ArticleMapper.toResDto(article);
  }

  public async remove(userId: UserID, articleId: ArticleID): Promise<void> {
    //TODO remove
  }

  public async like(userId: UserID, articleId: ArticleID): Promise<void> {
    await this.isArticleExist(articleId);

    const like = await this.likeRepository.findOneBy({ userId, articleId });
    if (like) {
      throw new ConflictException('You already liked this article');
    }

    await this.likeRepository.save(
      this.likeRepository.create({
        userId,
        articleId,
      }),
    );
  }

  public async unlike(userId: UserID, articleId: ArticleID): Promise<void> {
    await this.isArticleExist(articleId);

    const like = await this.likeRepository.findOneBy({ userId, articleId });
    if (!like) {
      throw new ConflictException("You haven't liked this article yet");
    }

    await this.likeRepository.remove(like);
  }

  private async createTags(tags: string[], manager: EntityManager): Promise<TagEntity[]> {
    const tagRepository = manager.getRepository(TagEntity);

    if (!tags || !tags.length) return [];

    const tagEntities = await tagRepository.findBy({ name: In(tags) });
    const existingTags = tagEntities.map((tag) => tag.name);
    const newTags = tags.filter((tag) => !existingTags.includes(tag));
    const newTagEntities = await tagRepository.save(
      newTags.map((tag) => tagRepository.create({ name: tag })),
    );
    return [...tagEntities, ...newTagEntities];
  }

  private async isArticleExist(articleId: ArticleID): Promise<void> {
    const article = await this.articleRepository.findOneBy({ id: articleId });
    if (!article) {
      throw new NotFoundException('Article not found');
    }
  }
}
