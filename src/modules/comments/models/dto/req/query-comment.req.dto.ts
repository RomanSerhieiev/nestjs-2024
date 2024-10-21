import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

import { ECommentOrderBy, ECommentSortFields } from '../../enums/sort.enum';

export class QueryCommentReqDto {
  @ApiProperty({
    description: 'Search term for filtering comments by content',
    example: 'Interesting comment',
  })
  @IsOptional()
  @IsString()
  readonly search?: string;

  @ApiProperty({
    description: 'ID of the user who posted the comment',
    example: 'f9b5d2c3-9934-4d8b-8bb6-91a3e5d8b123',
  })
  @IsOptional()
  @IsUUID()
  readonly authorId?: string;

  @ApiProperty({
    description: 'ID of the article associated with the comment',
    example: 'b6d3e2a7-22b3-4f3e-b3e9-ae9b7d5d7e23',
  })
  @IsOptional()
  @IsUUID()
  readonly articleId?: string;

  @ApiProperty({
    description: 'Page number for pagination',
    example: 1,
  })
  @IsOptional()
  readonly page?: number;

  @ApiProperty({
    description: 'Number of comments per page',
    example: 10,
  })
  @IsOptional()
  readonly limit?: number;

  @ApiProperty({
    description: 'Field for sorting comments (e.g., "authorId" or "createdAt")',
    example: 'createdAt',
  })
  @IsOptional()
  @IsString()
  readonly sort?: ECommentSortFields;

  @ApiProperty({
    description: 'Sorting order (asc or desc)',
    example: 'asc',
  })
  @IsOptional()
  @IsString()
  readonly orderBy?: ECommentOrderBy;
}
