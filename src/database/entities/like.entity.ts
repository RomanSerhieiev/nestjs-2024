import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { EEntity } from './enums/entity.enum';
import { IdCreated } from './models/created-updated.model';
import { ArticleID, LikeID, UserID } from './types/id.type';
import { UserEntity } from './user.entity';

@Entity(EEntity.LIKES)
export class LikeEntity extends IdCreated<LikeID> {
  @Column('uuid')
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.likes)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column('uuid')
  article_id: ArticleID;
  @ManyToOne(() => ArticleEntity, (entity) => entity.likes)
  @JoinColumn({ name: 'article_id' })
  article?: ArticleEntity;
}
