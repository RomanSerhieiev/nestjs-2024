import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ArticleToTagEntity } from './article-to-tag.entity';
import { CommentEntity } from './comment.entity';
import { EEntity } from './enums/entity.enum';
import { LikeEntity } from './like.entity';
import { IdCreatedUpdated } from './models/created-updated.model';
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
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.articles)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @OneToMany(() => ArticleToTagEntity, (entity) => entity.article)
  tags?: ArticleToTagEntity[];

  @OneToMany(() => LikeEntity, (entity) => entity.article)
  likes?: LikeEntity[];

  @OneToMany(() => CommentEntity, (entity) => entity.article)
  comments?: CommentEntity[];
}
