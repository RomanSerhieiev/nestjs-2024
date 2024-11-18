import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { EEntity } from './enums/entity.enum';
import { IdCreatedUpdated } from './models/id-created-updated.model';
import { ArticleID, CommentID, UserID } from './types/id.type';
import { UserEntity } from './user.entity';

@Entity(EEntity.COMMENTS)
export class CommentEntity extends IdCreatedUpdated<CommentID> {
  @Column('text')
  body: string;

  @Column('uuid')
  userId: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.comments)
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @Column('uuid')
  articleId: ArticleID;
  @ManyToOne(() => ArticleEntity, (entity) => entity.comments)
  @JoinColumn({ name: 'articleId' })
  article?: ArticleEntity;
}
