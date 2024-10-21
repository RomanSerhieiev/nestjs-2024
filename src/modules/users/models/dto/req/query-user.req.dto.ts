import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

import { EUserOrderBy, EUserSortFields } from '../../enums/sort.enum';

export class QueryUserReqDto {
  @ApiProperty({
    description: 'Search term for filtering users by name or email',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  readonly search?: string;

  @ApiProperty({
    description: 'Filter by email verification status',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  readonly isVerified?: boolean;

  @ApiProperty({
    description: 'Page number for pagination',
    example: 1,
  })
  @IsOptional()
  readonly page?: number;

  @ApiProperty({
    description: 'Number of users per page',
    example: 10,
  })
  @IsOptional()
  readonly limit?: number;

  @ApiProperty({
    description: 'Field for sorting users (e.g., "name" or "createdAt")',
    example: 'createdAt',
  })
  @IsOptional()
  @IsEnum(EUserSortFields)
  readonly sort?: EUserSortFields;

  @ApiProperty({
    description: 'Sorting order (asc or desc)',
    example: 'asc',
  })
  @IsOptional()
  @IsString()
  readonly orderBy?: EUserOrderBy;
}
