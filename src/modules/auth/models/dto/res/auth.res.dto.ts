import { PickType } from '@nestjs/swagger';

import { AuthBaseDto } from '../auth-base.dto';

export class AuthResDto extends PickType(AuthBaseDto, [
  'email',
  'isVerified',
  'createdAt',
  'updatedAt',
] as const) {}
