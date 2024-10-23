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

@Entity(ETableName.REFRESH_TOKENS)
export class RefreshTokenEntity extends CreatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  refreshToken: string;

  @Column('text')
  deviceId: string;

  @Column('uuid')
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.refreshTokens)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
