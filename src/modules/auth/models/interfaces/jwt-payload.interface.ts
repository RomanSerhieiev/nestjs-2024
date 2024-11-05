import { UserID } from '../../../../database/entities/types/id.type';

export interface IJwtPayload {
  userId: UserID;
  deviceId: string;
}
