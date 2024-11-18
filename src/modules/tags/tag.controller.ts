import { Controller, Get } from '@nestjs/common';
import { ApiConflictResponse, ApiTags } from '@nestjs/swagger';

import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { TagListResDto } from './models/dto/res/tag-list.res.dto';
import { TagService } from './services/tag.service';

@ApiTags('Tags')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @SkipAuth()
  @ApiConflictResponse({ description: 'Conflict' })
  @Get('popular')
  public async getPopular(): Promise<TagListResDto> {
    return await this.tagService.getPopular();
  }
}
