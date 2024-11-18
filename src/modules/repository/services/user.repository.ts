import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

import { UserID } from '../../../database/entities/types/id.type';
import { UserEntity } from '../../../database/entities/user.entity';
import { QueryUserReqDto } from '../../users/models/dto/req/query-user.req.dto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  public async findAll(query: QueryUserReqDto): Promise<[UserEntity[], number]> {
    const qb = await this.getQb();

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async findById(userId: UserID): Promise<UserEntity> {
    const qb = await this.getQb();

    qb.where('user.id = :userId', { userId });

    return await qb.getOne();
  }

  private async getQb(): Promise<SelectQueryBuilder<UserEntity>> {
    const qb = this.createQueryBuilder('user');
    qb.leftJoinAndSelect('user.articles', 'article');
    qb.leftJoinAndSelect('user.comments', 'comment');
    qb.leftJoinAndSelect('user.likes', 'like');
    qb.leftJoinAndSelect('user.followers', 'follower');
    qb.leftJoinAndSelect('user.followings', 'following');

    return qb;
  }
}
