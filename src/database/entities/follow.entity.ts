import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { EEntity } from './enums/entity.enum';
import { IdCreated } from './models/id-created-updated.model';
import { FollowID, UserID } from './types/id.type';
import { UserEntity } from './user.entity';

@Index(['followerId', 'followingId'], { unique: true })
@Entity(EEntity.FOLLOWS)
export class FollowEntity extends IdCreated<FollowID> {
  @Column('uuid')
  followerId: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.followings)
  @JoinColumn({ name: 'followerId' })
  follower?: UserEntity;

  @Column('uuid')
  followingId: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.followers)
  @JoinColumn({ name: 'followingId' })
  following?: UserEntity;
}
