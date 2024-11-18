import { Injectable } from '@nestjs/common';

import { TagRepository } from '../../repository/services/tag.repository';
import { TagListResDto } from '../models/dto/res/tag-list.res.dto';
import { TagMapper } from '../presenters/tag.mapper';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  public async getPopular(): Promise<TagListResDto> {
    const [tags, total] = await this.tagRepository.getPopular();
    return TagMapper.toResDtoList(tags, total);
  }
}
