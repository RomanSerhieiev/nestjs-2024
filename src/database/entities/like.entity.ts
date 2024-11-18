import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { EEntity } from './enums/entity.enum';
import { IdCreated } from './models/id-created-updated.model';
import { ArticleID, LikeID, UserID } from './types/id.type';
import { UserEntity } from './user.entity';

@Index(['userId', 'articleId'], { unique: true })
@Entity(EEntity.LIKES)
export class LikeEntity extends IdCreated<LikeID> {
  @Column('uuid')
  userId: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.likes)
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @Column('uuid')
  articleId: ArticleID;
  @ManyToOne(() => ArticleEntity, (entity) => entity.likes)
  @JoinColumn({ name: 'articleId' })
  article?: ArticleEntity;
}
