import { MockType } from '../../../common/types/mock.type';
import { UserService } from '../services/user.service';

export const userServiceMock: MockType<UserService> = {
  deleteAvatar: jest.fn(),
  findAll: jest.fn(),
  findMe: jest.fn(),
  findOne: jest.fn(),
  follow: jest.fn(),
  removeMe: jest.fn(),
  unfollow: jest.fn(),
  updateMe: jest.fn(),
  uploadAvatar: jest.fn(),
};
