import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ArticleEntity } from './article.entity';
import { ETableName } from './enums/table-name.enum';
import { CreatedModel } from './models/created-updated.model';
import { TagEntity } from './tag.entity';

@Entity(ETableName.ARTICLES_TO_TAGS)
export class ArticleToTagEntity extends CreatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  article_id: string;
  @ManyToOne(() => ArticleEntity, (entity) => entity.tags)
  @JoinColumn({ name: 'article_id' })
  article?: ArticleEntity;

  @Column('uuid')
  tag_id: string;
  @ManyToOne(() => TagEntity, (entity) => entity.articles)
  @JoinColumn({ name: 'tag_id' })
  tag?: TagEntity;
}
