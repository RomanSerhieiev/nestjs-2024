import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class IdCreated<T> {
  @PrimaryGeneratedColumn('uuid')
  id: T;

  @CreateDateColumn()
  created: Date;
}

export abstract class IdCreatedUpdated<T> extends IdCreated<T> {
  @UpdateDateColumn()
  updated: Date;
}
