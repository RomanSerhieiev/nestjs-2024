import { Column, Entity, JoinTable, ManyToMany, VirtualColumn } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { EEntity } from './enums/entity.enum';
import { IdCreated } from './models/id-created-updated.model';
import { TagID } from './types/id.type';

@Entity(EEntity.TAGS)
export class TagEntity extends IdCreated<TagID> {
  @Column('text')
  name: string;

  @ManyToMany(() => ArticleEntity, (entity) => entity.tags)
  @JoinTable()
  articles?: ArticleEntity[];

  @VirtualColumn({ query: () => 'NULL' })
  articleCount?: number;
}
