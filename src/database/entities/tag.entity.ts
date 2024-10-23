import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ArticleToTagEntity } from './article-to-tag.entity';
import { ETableName } from './enums/table-name.enum';
import { CreatedAndUpdatedModel } from './models/created-updated.model';

@Entity(ETableName.TAGS)
export class TagEntity extends CreatedAndUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @OneToMany(() => ArticleToTagEntity, (entity) => entity.tag)
  articles?: ArticleToTagEntity[];
}
