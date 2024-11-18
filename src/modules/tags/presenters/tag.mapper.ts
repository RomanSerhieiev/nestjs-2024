import { TagEntity } from '../../../database/entities/tag.entity';
import { TagResDto } from '../models/dto/res/tag.res.dto';
import { TagListResDto } from '../models/dto/res/tag-list.res.dto';

export class TagMapper {
  public static toResDto(tag: TagEntity): TagResDto {
    return {
      id: tag.id,
      name: tag.name,
      articleCount: tag.articleCount || 0,
    };
  }

  public static toResDtoList(tags: TagEntity[], total: number): TagListResDto {
    return { tags: tags.map(this.toResDto), total };
  }
}
