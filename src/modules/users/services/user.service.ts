import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { UserID } from '../../../database/entities/types/id.type';
import { QueryArticleReqDto } from '../../articles/models/dto/req/query-article.req.dto';
import { AuthCacheService } from '../../auth/services/auth-cache.service';
import { EItemType } from '../../file-storage/enums/item-type.enum';
import { S3Service } from '../../file-storage/services/s3.service';
import { FollowRepository } from '../../repository/services/follow.repository';
import { LikeRepository } from '../../repository/services/like.repository';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateUserReqDto } from '../models/dto/req/update-user.req.dto';
import { UserResDto } from '../models/dto/res/user.res.dto';
import { UserListResDto } from '../models/dto/res/user-list.res.dto';
import { UserMapper } from '../presenters/user.mapper';

@Injectable()
export class UserService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly authCacheService: AuthCacheService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly likeRepository: LikeRepository,
    private readonly followRepository: FollowRepository,
  ) {}

  public async findMe(userId: UserID): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id: userId });
    return UserMapper.toResDto(user);
  }

  public async updateMe(userId: UserID, dto: UpdateUserReqDto): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id: userId });
    this.userRepository.merge(user, dto);
    const updatedUser = await this.userRepository.save(user);
    return UserMapper.toResDto(updatedUser);
  }

  public async removeMe(userId: UserID): Promise<void> {
    await this.userRepository.update({ id: userId }, { deleted: new Date() });
    await this.authCacheService.deleteAllTokens(userId);
    await this.refreshTokenRepository.delete({ userId });
    await this.likeRepository.delete({ userId });
    await this.followRepository.delete({ followerId: userId });
    await this.followRepository.delete({ followingId: userId });
  }

  public async uploadAvatar(userId: UserID, avatar: Express.Multer.File): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    const pathToAvatar = await this.s3Service.uploadFile(avatar, EItemType.IMAGE, userId);
    if (user.image) {
      await this.s3Service.deleteFile(user.image);
    }
    await this.userRepository.save({ ...user, image: pathToAvatar });
  }

  public async deleteAvatar(userId: UserID): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (user.image) {
      await this.s3Service.deleteFile(user.image);
      await this.userRepository.save({ ...user, image: null });
    }
  }

  public async findAll(query: QueryArticleReqDto): Promise<UserListResDto> {
    //TODO findAll - виводити всіх користувачів з їхніми постами, коментарями, лайками, підписками і підписниками
    const [users, total] = await this.userRepository.findAll(query);
    return UserMapper.toResDtoList(users, total, query);
  }

  public async findOne(userId: UserID): Promise<UserResDto> {
    //TODO findOne - виводити одного користувача з його постами, коментарями, лайками, підписками і підписниками
    const user = await this.userRepository.findById(userId);
    return UserMapper.toResDto(user);
  }

  public async follow(followerId: UserID, followingId: UserID): Promise<void> {
    if (followerId === followingId) {
      throw new ConflictException('You cannot follow yourself');
    }

    await this.isUserExist(followingId);

    const follow = await this.followRepository.findOneBy({ followerId, followingId });
    if (follow) {
      throw new ConflictException('You already follow this user');
    }

    await this.followRepository.save(
      this.followRepository.create({
        followerId,
        followingId,
      }),
    );
  }

  public async unfollow(followerId: UserID, followingId: UserID): Promise<void> {
    if (followerId === followingId) {
      throw new ConflictException('You cannot unfollow yourself');
    }

    await this.isUserExist(followingId);

    const follow = await this.followRepository.findOneBy({ followerId, followingId });
    if (!follow) {
      throw new ConflictException("You don't follow this user");
    }

    await this.followRepository.delete({
      followerId,
      followingId,
    });
  }

  private async isUserExist(userId: UserID): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }
}
