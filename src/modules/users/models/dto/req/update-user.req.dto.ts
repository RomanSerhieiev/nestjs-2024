import { PickType } from '@nestjs/swagger';

import { UserBaseDto } from '../user-base.dto';

export class UpdateUserReqDto extends PickType(UserBaseDto, [
  'name',
  'email',
  'password',
] as const) {}
