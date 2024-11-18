import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

import { CommentEntity } from './comment.entity';
import { EEntity } from './enums/entity.enum';
import { LikeEntity } from './like.entity';
import { IdCreatedUpdated } from './models/id-created-updated.model';
import { TagEntity } from './tag.entity';
import { ArticleID, UserID } from './types/id.type';
import { UserEntity } from './user.entity';

@Entity(EEntity.ARTICLES)
export class ArticleEntity extends IdCreatedUpdated<ArticleID> {
  @Column('text')
  title: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('text')
  body: string;

  @Column('uuid')
  userId: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.articles)
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @ManyToMany(() => TagEntity, (entity) => entity.articles)
  tags?: TagEntity[];

  @OneToMany(() => LikeEntity, (entity) => entity.article)
  likes?: LikeEntity[];

  @OneToMany(() => CommentEntity, (entity) => entity.article)
  comments?: CommentEntity[];
}
