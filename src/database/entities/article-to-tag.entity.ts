import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { EEntity } from './enums/entity.enum';
import { IdCreated } from './models/created-updated.model';
import { TagEntity } from './tag.entity';
import { ArticleID, ArticleToTagID, TagID } from './types/id.type';

@Entity(EEntity.ARTICLES_TO_TAGS)
export class ArticleToTagEntity extends IdCreated<ArticleToTagID> {
  @Column('uuid')
  article_id: ArticleID;
  @ManyToOne(() => ArticleEntity, (entity) => entity.tags)
  @JoinColumn({ name: 'article_id' })
  article?: ArticleEntity;

  @Column('uuid')
  tag_id: TagID;
  @ManyToOne(() => TagEntity, (entity) => entity.articles)
  @JoinColumn({ name: 'tag_id' })
  tag?: TagEntity;
}
