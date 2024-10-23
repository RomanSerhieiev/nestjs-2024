import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ArticleToTagEntity } from './article-to-tag.entity';
import { CommentEntity } from './comment.entity';
import { ETableName } from './enums/table-name.enum';
import { LikeEntity } from './like.entity';
import { CreatedAndUpdatedModel } from './models/created-updated.model';
import { UserEntity } from './user.entity';

@Entity(ETableName.ARTICLES)
export class ArticleEntity extends CreatedAndUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('text')
  body: string;

  @Column('uuid')
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.articles)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @OneToMany(() => ArticleToTagEntity, (entity) => entity.article)
  tags?: ArticleToTagEntity[];

  @OneToMany(() => LikeEntity, (entity) => entity.article)
  likes?: LikeEntity[];

  @OneToMany(() => CommentEntity, (entity) => entity.article)
  comments?: CommentEntity[];
}
