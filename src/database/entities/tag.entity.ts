import { Column, Entity, OneToMany } from 'typeorm';

import { ArticleToTagEntity } from './article-to-tag.entity';
import { EEntity } from './enums/entity.enum';
import { IdCreatedUpdated } from './models/id-created-updated.model';
import { TagID } from './types/id.type';

@Entity(EEntity.TAGS)
export class TagEntity extends IdCreatedUpdated<TagID> {
  @Column('text')
  name: string;

  @OneToMany(() => ArticleToTagEntity, (entity) => entity.tag)
  articles?: ArticleToTagEntity[];
}
