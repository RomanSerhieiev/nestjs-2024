import { PickType } from '@nestjs/swagger';

import { BaseUserDto } from '../base-user.dto';

export class UpdateUserReqDto extends PickType(BaseUserDto, [
  'name',
  'email',
  'password',
] as const) {}
