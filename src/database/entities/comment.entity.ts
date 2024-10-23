import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ArticleEntity } from './article.entity';
import { ETableName } from './enums/table-name.enum';
import { CreatedAndUpdatedModel } from './models/created-updated.model';
import { UserEntity } from './user.entity';

@Entity(ETableName.COMMENTS)
export class CommentEntity extends CreatedAndUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  body: string;

  @Column('uuid')
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.comments)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column('uuid')
  article_id: string;
  @ManyToOne(() => ArticleEntity, (entity) => entity.comments)
  @JoinColumn({ name: 'article_id' })
  article?: ArticleEntity;
}
