import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { EEntity } from './enums/entity.enum';
import { IdCreatedUpdated } from './models/created-updated.model';
import { ArticleID, CommentID, UserID } from './types/id.type';
import { UserEntity } from './user.entity';

@Entity(EEntity.COMMENTS)
export class CommentEntity extends IdCreatedUpdated<CommentID> {
  @Column('text')
  body: string;

  @Column('uuid')
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.comments)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column('uuid')
  article_id: ArticleID;
  @ManyToOne(() => ArticleEntity, (entity) => entity.comments)
  @JoinColumn({ name: 'article_id' })
  article?: ArticleEntity;
}
