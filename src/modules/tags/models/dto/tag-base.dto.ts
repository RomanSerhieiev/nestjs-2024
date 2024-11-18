import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { TagID } from '../../../../database/entities/types/id.type';

export class TagBaseDto {
  @ApiProperty({ description: 'Unique identifier of the tag' })
  @IsString()
  @IsNotEmpty()
  readonly id: TagID;

  @ApiProperty({ description: 'Name of the article' })
  @IsString()
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  readonly name: string;

  @ApiProperty({ description: 'Comments of the article', type: String })
  @IsArray()
  @IsString({ each: true })
  @Transform(TransformHelper.trimArray)
  @Transform(TransformHelper.toLowerCaseArray)
  readonly articles: string[];

  @ApiProperty({
    description: 'Date when the article was created',
    example: '2023-01-01T12:00:00Z',
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  readonly created: Date;
}
