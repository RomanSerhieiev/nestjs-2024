import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { UserResDto } from '../../../users/models/dto/res/user.res.dto';
import { EArticleTags } from '../enums/tags.enum';

export class ArticleBaseDto {
  @ApiProperty({ description: 'Unique identifier of the article' })
  @IsString()
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  readonly _id: string;

  @ApiProperty({ description: 'Title of the article' })
  @IsString()
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  readonly title: string;

  @ApiProperty({ description: 'Content of the article' })
  @IsString()
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  readonly content: string;

  @ApiProperty({ description: 'Author of the article', type: () => UserResDto })
  @ValidateNested()
  @Type(() => UserResDto)
  readonly authorId: UserResDto;

  @ApiProperty({
    description: 'Tags associated with the article',
    enum: EArticleTags,
    isArray: true,
  })
  @IsArray()
  @IsEnum(EArticleTags, { each: true })
  readonly tags: EArticleTags[];

  @ApiProperty({ description: 'Date when the article was created', type: Date })
  @IsDate()
  @Type(() => Date)
  readonly createdAt: Date;

  @ApiProperty({
    description: 'Date when the article was last updated',
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  readonly updatedAt: Date;
}
