import { Column, Entity, OneToMany } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { CommentEntity } from './comment.entity';
import { EEntity } from './enums/entity.enum';
import { FollowEntity } from './follow.entity';
import { LikeEntity } from './like.entity';
import { IdCreatedUpdated } from './models/created-updated.model';
import { RefreshTokenEntity } from './refresh-token.entity';
import { UserID } from './types/id.type';

@Entity(EEntity.USERS)
export class UserEntity extends IdCreatedUpdated<UserID> {
  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('text', { nullable: true })
  bio?: string;

  @Column('text', { nullable: true })
  image?: string;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => ArticleEntity, (entity) => entity.user)
  articles?: ArticleEntity[];

  @OneToMany(() => LikeEntity, (entity) => entity.user)
  likes?: LikeEntity[];

  @OneToMany(() => CommentEntity, (entity) => entity.user)
  comments?: CommentEntity[];

  @OneToMany(() => FollowEntity, (entity) => entity.following)
  followers?: FollowEntity[];

  @OneToMany(() => FollowEntity, (entity) => entity.follower)
  followings?: FollowEntity[];
}
