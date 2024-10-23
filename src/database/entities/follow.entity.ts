import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ETableName } from './enums/table-name.enum';
import { CreatedModel } from './models/created-updated.model';
import { UserEntity } from './user.entity';

@Entity(ETableName.FOLLOWS)
export class FollowEntity extends CreatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  follower_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.followings)
  @JoinColumn({ name: 'follower_id' })
  follower?: UserEntity;

  @Column('uuid')
  following_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.followers)
  @JoinColumn({ name: 'following_id' })
  following?: UserEntity;
}
