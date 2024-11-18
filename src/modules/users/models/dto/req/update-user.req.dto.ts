import { PartialType, PickType } from '@nestjs/swagger';

import { BaseUserDto } from '../base-user.dto';

export class UpdateUserReqDto extends PickType(PartialType(BaseUserDto), [
  'name',
  'bio',
] as const) {}
