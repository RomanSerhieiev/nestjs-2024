import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

import { EArticleOrderBy, EArticleSortFields } from '../../enums/sort.enum';
import { EArticleTags } from '../../enums/tags.enum';

export class QueryArticleReqDto {
  @ApiProperty({
    description: 'Search term for filtering articles by title or content',
    example: 'Latest technology trends',
  })
  @IsOptional()
  @IsString()
  readonly search?: string;

  @ApiProperty({
    description: 'ID of the article author',
    example: 'a1b2c3d4-5678-90ef-gh12-3456ijkl7890',
  })
  @IsOptional()
  @IsUUID()
  readonly authorId?: string;

  @ApiProperty({
    description: 'Filter articles by specific tags',
    example: ['TECHNOLOGY', 'BUSINESS'],
    isArray: true,
  })
  @IsOptional()
  @IsEnum(EArticleTags, { each: true })
  readonly tags?: EArticleTags[];

  @ApiProperty({
    description: 'Page number for pagination',
    example: 1,
  })
  @IsOptional()
  readonly page?: number;

  @ApiProperty({
    description: 'Number of articles per page',
    example: 10,
  })
  @IsOptional()
  readonly limit?: number;

  @ApiProperty({
    description: 'Sorting field for articles (e.g., "createdAt" or "title")',
    example: 'createdAt',
  })
  @IsOptional()
  @IsString()
  readonly sort?: EArticleSortFields;

  @ApiProperty({
    description: 'Sorting order (asc or desc)',
    example: 'asc',
  })
  @IsOptional()
  @IsString()
  readonly orderBy?: EArticleOrderBy;
}
