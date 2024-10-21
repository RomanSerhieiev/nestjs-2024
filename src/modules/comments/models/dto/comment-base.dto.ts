import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class CommentBaseDto {
  @ApiProperty({
    description: 'Unique identifier of the comment',
    example: 'b9d1c3a7-88b5-4e6e-90e9-ae91e5d8e4e3',
  })
  @IsUUID()
  readonly _id: string;

  @ApiProperty({
    description: 'Comment content',
    example: 'This is a great article!',
  })
  @IsString()
  @Transform(TransformHelper.trim)
  readonly content: string;

  @ApiProperty({
    description: 'ID of the user who posted the comment',
    example: 'f9b5d2c3-9934-4d8b-8bb6-91a3e5d8b123',
  })
  @IsUUID()
  @Transform(TransformHelper.trim)
  readonly authorId: string;

  @ApiProperty({
    description: 'ID of the article associated with the comment',
    example: 'b6d3e2a7-22b3-4f3e-b3e9-ae9b7d5d7e23',
  })
  @IsUUID()
  @Transform(TransformHelper.trim)
  readonly articleId: string;

  @ApiProperty({
    description: 'Date when the comment was created',
    example: '2024-01-01T10:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
  readonly createdAt: Date;

  @ApiProperty({
    description: 'Date when the comment was last updated',
    example: '2024-01-02T11:00:00Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly updatedAt?: Date;
}
