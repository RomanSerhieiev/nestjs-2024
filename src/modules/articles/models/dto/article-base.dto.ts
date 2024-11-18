import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { ArticleID } from '../../../../database/entities/types/id.type';
import { UserResDto } from '../../../users/models/dto/res/user.res.dto';

export class ArticleBaseDto {
  @ApiProperty({ description: 'Unique identifier of the article' })
  @IsString()
  @IsNotEmpty()
  readonly id: ArticleID;

  @ApiProperty({ description: 'Title of the article' })
  @IsString()
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  readonly title: string;

  @ApiProperty({ description: 'Content of the article' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Transform(TransformHelper.trim)
  readonly description?: string;

  @ApiProperty({ description: 'Content of the article' })
  @IsString()
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  readonly body: string;

  @ApiProperty({ description: 'Author of the article' })
  readonly author: UserResDto;

  @ApiProperty({ description: 'Tags of the article', type: String })
  @IsArray()
  @IsString({ each: true })
  @Length(3, 30, { each: true })
  @ArrayMaxSize(5)
  @Transform(TransformHelper.trimArray)
  @Transform(TransformHelper.uniqueItems)
  @Transform(TransformHelper.toLowerCaseArray)
  readonly tags: string[];

  readonly isLiked?: boolean;

  @ApiProperty({
    description: 'Date when the article was created',
    example: '2023-01-01T12:00:00Z',
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  readonly created: Date;

  @ApiProperty({
    description: 'Date when the article was last updated',
    example: '2023-01-02T12:00:00Z',
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  readonly updated: Date;
}
