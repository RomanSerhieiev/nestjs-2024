import { PickType } from '@nestjs/swagger';

import { AuthBaseDto } from '../auth-base.dto';

export class CreateAuthDto extends PickType(AuthBaseDto, [
  'email',
  'password',
] as const) {}
