import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { EEntity } from './enums/entity.enum';
import { IdCreated } from './models/id-created-updated.model';
import { FollowID, UserID } from './types/id.type';
import { UserEntity } from './user.entity';

@Entity(EEntity.FOLLOWS)
export class FollowEntity extends IdCreated<FollowID> {
  @Column('uuid')
  follower_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.followings)
  @JoinColumn({ name: 'follower_id' })
  follower?: UserEntity;

  @Column('uuid')
  following_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.followers)
  @JoinColumn({ name: 'following_id' })
  following?: UserEntity;
}
