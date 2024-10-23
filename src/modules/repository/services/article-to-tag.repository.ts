import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ArticleToTagEntity } from '../../../database/entities/article-to-tag.entity';

@Injectable()
export class ArticleToTagRepository extends Repository<ArticleToTagEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ArticleToTagEntity, dataSource.manager);
  }
}
