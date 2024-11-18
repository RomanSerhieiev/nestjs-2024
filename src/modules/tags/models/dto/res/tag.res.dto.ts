import { PickType } from '@nestjs/swagger';

import { TagBaseDto } from '../tag-base.dto';

export class TagResDto extends PickType(TagBaseDto, ['id', 'name'] as const) {
  articleCount: number;
}
