import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { EArticleTags } from '../../modules/articles/models/enums/tags.enum';

@Entity('articles')
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column('text')
  title: string;

  @Column('text')
  content: string;

  @Column('uuid')
  authorId: string;

  @Column('text')
  tags: EArticleTags;
}
