import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column('text')
  content: string;

  @Column('uuid')
  authorId: string;

  @Column('uuid')
  articleId: string;
}
