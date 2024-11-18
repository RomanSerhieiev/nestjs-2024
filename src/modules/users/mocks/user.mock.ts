import { UserID } from '../../../database/entities/types/id.type';
import { UserEntity } from '../../../database/entities/user.entity';
import { QueryUserReqDto } from '../models/dto/req/query-user.req.dto';
import { UpdateUserReqDto } from '../models/dto/req/update-user.req.dto';
import { UserResDto } from '../models/dto/res/user.res.dto';
import { UserListResDto } from '../models/dto/res/user-list.res.dto';
import { IUserData } from '../models/interfaces/user-data.interface';

export class UserMock {
  static entity(props?: Partial<UserEntity>): UserEntity {
    return {
      id: 'userId' as UserID,
      name: 'name',
      email: 'email',
      password: 'password',
      created: new Date(),
      updated: new Date(),
      deleted: new Date(),
      ...(props || {}),
    };
  }

  static avatar(props?: Partial<Express.Multer.File>): Express.Multer.File {
    return {
      buffer: undefined,
      destination: '',
      encoding: '',
      fieldname: '',
      filename: '',
      mimetype: '',
      originalname: '',
      path: '',
      size: 0,
      stream: undefined,
      ...(props || {}),
    };
  }

  static queryReqDto(props?: Partial<QueryUserReqDto>): QueryUserReqDto {
    return {};
  }

  static updateReqDto(props?: Partial<UpdateUserReqDto>): UpdateUserReqDto {
    return {
      name: 'name',
    };
  }

  static resDto(props?: Partial<UserResDto>): UserResDto {
    return {
      id: 'userId' as UserID,
      name: 'name',
      email: 'email',
      bio: null,
      image: null,
      isFollowed: false,
      ...(props || {}),
    };
  }

  static listResDto(props?: Partial<UserListResDto>): UserListResDto {
    return {
      users: [],
      total: 0,
      ...(props || {}),
    };
  }

  static data(props?: Partial<IUserData>): IUserData {
    return {
      userId: 'userId' as UserID,
      email: 'email',
      deviceId: 'deviceId',
      ...(props || {}),
    };
  }
}
