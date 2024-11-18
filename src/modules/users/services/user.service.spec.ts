import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { UserID } from '../../../database/entities/types/id.type';
import { AuthCacheService } from '../../auth/services/auth-cache.service';
import { S3Service } from '../../file-storage/services/s3.service';
import { FollowRepository } from '../../repository/services/follow.repository';
import { LikeRepository } from '../../repository/services/like.repository';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserMock } from '../mocks/user.mock';
import { userProvidersMock } from '../mocks/user.module.mock';
import { UserService } from './user.service';

describe(UserService.name, () => {
  const userEntity = UserMock.entity();
  const userUpdateReqDto = UserMock.updateReqDto();
  const userResDto = UserMock.resDto();
  const userData = UserMock.data();
  const userAfterUpdate = UserMock.entity(userUpdateReqDto);

  let service: UserService;

  let s3Service: S3Service;
  let authCacheService: AuthCacheService;
  let userRepository: UserRepository;
  let refreshTokenRepository: RefreshTokenRepository;
  let likeRepository: LikeRepository;
  let followRepository: FollowRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [...userProvidersMock, UserService],
    }).compile();
    service = module.get<UserService>(UserService);

    s3Service = module.get<S3Service>(S3Service);
    authCacheService = module.get<AuthCacheService>(AuthCacheService);
    userRepository = module.get<UserRepository>(UserRepository);
    refreshTokenRepository = module.get<RefreshTokenRepository>(RefreshTokenRepository);
    likeRepository = module.get<LikeRepository>(LikeRepository);
    followRepository = module.get<FollowRepository>(FollowRepository);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMe', () => {
    it('should return user', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(userEntity);

      const result = await service.findMe(userData.userId);

      expect(userRepository.findOneBy).toHaveBeenNthCalledWith(1, {
        id: userData.userId,
      });
      expect(result).toEqual(userResDto);
      expect(result.email).toBe(userResDto.email);
    });
  });

  describe('updateMe', () => {
    it('should return updated user', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(userEntity);
      jest.spyOn(userRepository, 'merge').mockImplementation(() => userAfterUpdate);
      jest.spyOn(userRepository, 'save').mockResolvedValue(userAfterUpdate);

      const result = await service.updateMe(userData.userId, userUpdateReqDto);

      expect(userRepository.findOneBy).toHaveBeenNthCalledWith(1, { id: userData.userId });
      expect(userRepository.merge).toHaveBeenCalledWith(userEntity, userUpdateReqDto);
      expect(userRepository.save).toHaveBeenCalledWith(userAfterUpdate);
      expect(result).toEqual(userResDto);
      expect(result.name).toBe(userResDto.name);
    });
  });

  describe('follow', () => {
    it('should throw ConflictException when user tries to follow himself', async () => {
      await expect(service.follow(userData.userId, userData.userId)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw NotFoundException when user not found', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.follow(userData.userId, 'testId' as UserID)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException when user already followed', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(userEntity);
      jest.spyOn(followRepository, 'findOneBy').mockResolvedValue({} as any);

      await expect(service.follow(userData.userId, 'testId' as UserID)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should follow user', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(userEntity);
      jest.spyOn(followRepository, 'findOneBy').mockResolvedValue(null);
      jest.spyOn(followRepository, 'save').mockResolvedValue(null);

      await service.follow(userData.userId, 'testId' as UserID);

      expect(userRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(followRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(followRepository.create).toHaveBeenCalledTimes(1);
      expect(followRepository.save).toHaveBeenCalledTimes(1);
    });
  });
});
