import { MockType } from '../../../common/types/mock.type';
import { FollowRepository } from '../services/follow.repository';
import { commonRepositoryMock } from './common.repository.mock';

export const followRepositoryMock: MockType<FollowRepository> = {
  ...commonRepositoryMock,
};
