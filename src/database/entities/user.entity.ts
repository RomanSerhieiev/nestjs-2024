import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('text', { nullable: true })
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('boolean', { default: false })
  isVerified: boolean;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens: RefreshTokenEntity[];

  @OneToMany(() => ArticleEntity, (entity) => entity.user)
  articles: ArticleEntity[];
}
