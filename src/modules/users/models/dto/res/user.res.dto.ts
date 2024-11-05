import { PickType } from '@nestjs/swagger';

import { BaseUserDto } from '../base-user.dto';

export class UserResDto extends PickType(BaseUserDto, [
  'id',
  'name',
  'email',
  'bio',
  'image',
] as const) {}
