import { PickType } from '@nestjs/swagger';

import { UserBaseDto } from '../user-base.dto';

export class UserResDto extends PickType(UserBaseDto, [
  '_id',
  'name',
  'email',
  'isVerified',
  'createdAt',
  'updatedAt',
] as const) {}
