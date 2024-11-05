import { UserID } from '../../../../database/entities/types/id.type';

export interface IUserData {
  userId: UserID;
  deviceId: string;
  email: string;
}
