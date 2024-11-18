import { UserEntity } from '../../../database/entities/user.entity';
import { IJwtPayload } from '../../auth/models/interfaces/jwt-payload.interface';
import { QueryUserReqDto } from '../models/dto/req/query-user.req.dto';
import { UserResDto } from '../models/dto/res/user.res.dto';
import { UserListResDto } from '../models/dto/res/user-list.res.dto';
import { IUserData } from '../models/interfaces/user-data.interface';

export class UserMapper {
  public static toResDto(user: UserEntity): UserResDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio || null,
      image: user.image ? `${process.env.AWS_S3_ENDPOINT}/${user.image}` : null,
      isFollowed: user.followers?.length > 0 || false,
    };
  }

  public static toResDtoList(
    users: UserEntity[],
    total: number,
    query: QueryUserReqDto,
  ): UserListResDto {
    return { users: users.map(this.toResDto), total, ...query };
  }

  public static toIUserData(user: UserEntity, jwtPayload: IJwtPayload): IUserData {
    return {
      userId: user.id,
      deviceId: jwtPayload.deviceId,
      email: user.email,
    };
  }
}
