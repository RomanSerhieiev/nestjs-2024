import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

import { TagEntity } from '../../../database/entities/tag.entity';

@Injectable()
export class TagRepository extends Repository<TagEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(TagEntity, dataSource.manager);
  }

  public async getPopular(): Promise<[TagEntity[], number]> {
    const qb = await this.getQb();
    return await qb.getManyAndCount();
  }

  private async getQb(): Promise<SelectQueryBuilder<TagEntity>> {
    const qb = this.createQueryBuilder('tag');
    qb.leftJoin('tag.articles', 'article');
    qb.addSelect('COUNT(article.id)', 'tag_articleCount');
    qb.groupBy('tag.id');
    qb.orderBy('"tag_articleCount"', 'DESC');
    qb.limit(10);

    return qb;
  }
}
