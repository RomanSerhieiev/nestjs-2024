import { MockType } from '../../../common/types/mock.type';
import { LikeRepository } from '../services/like.repository';
import { commonRepositoryMock } from './common.repository.mock';

export const likeRepositoryMock: MockType<LikeRepository> = {
  ...commonRepositoryMock,
};
