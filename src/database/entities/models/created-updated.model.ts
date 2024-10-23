import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CreatedModel {
  @CreateDateColumn()
  created: Date;
}

export abstract class CreatedAndUpdatedModel extends CreatedModel {
  @UpdateDateColumn()
  updated: Date;
}
