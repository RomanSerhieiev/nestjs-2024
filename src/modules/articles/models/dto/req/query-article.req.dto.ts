import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';

export class QueryArticleReqDto {
  @ApiProperty({
    description: 'Number of articles per page',
    example: 10,
    minimum: 1,
    maximum: 100,
    default: 10,
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @Max(100)
  @Min(1)
  @IsOptional()
  readonly limit?: number = 10;

  @ApiProperty({
    description: 'Offset for pagination, indicates the starting position of articles',
    example: 0,
    minimum: 0,
    default: 0,
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  readonly offset?: number = 0;

  @ApiProperty({
    description: 'Filter articles by a specific tag',
    example: 'TECHNOLOGY',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly tag?: string;

  @ApiProperty({
    description: 'Search term for filtering articles by title or content',
    example: 'Latest technology trends',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  readonly search?: string;
}
