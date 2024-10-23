import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class UserBaseDto {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: 'a9b6c2f1-dbb7-4b72-8eb5-82a74c8c918e',
  })
  @IsUUID()
  readonly id: string;

  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  readonly name: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  readonly email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'strongpassword123',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  readonly password: string;

  @ApiProperty({
    description: 'User verification status',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  readonly isVerified?: boolean;

  @ApiProperty({
    description: 'Date when the user was created',
    example: '2023-01-01T12:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
  readonly createdAt: Date;

  @ApiProperty({
    description: 'Date when the user was last updated',
    example: '2023-01-02T12:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
  readonly updatedAt: Date;
}
