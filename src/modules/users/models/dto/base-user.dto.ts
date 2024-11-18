import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';

import { regexConstant } from '../../../../common/constants/regex.constant';
import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { UserID } from '../../../../database/entities/types/id.type';

export class BaseUserDto {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: 'a9b6c2f1-dbb7-4b72-8eb5-82a74c8c918e',
  })
  @IsUUID()
  @Type(() => String)
  readonly id: UserID;

  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  readonly name: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @Length(0, 300)
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @Matches(regexConstant.EMAIL)
  readonly email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'QWErty!@#123',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  @Matches(regexConstant.PASSWORD)
  readonly password: string;

  @ApiProperty({
    description: 'Optional bio of the user',
    example: 'Software developer with a passion for open-source projects.',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(0, 300)
  readonly bio?: string;

  @ApiProperty({
    description: 'Optional profile image URL of the user',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(0, 3000)
  readonly image?: string;

  readonly isFollowed?: boolean;

  @ApiProperty({
    description: 'Date when the user was created',
    example: '2023-01-01T12:00:00Z',
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  readonly created: Date;

  @ApiProperty({
    description: 'Date when the user was last updated',
    example: '2023-01-02T12:00:00Z',
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  readonly updated: Date;

  @ApiProperty({
    description: 'Date when the user was deleted',
    example: '2023-01-01T12:00:00Z',
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  readonly deleted: Date;
}
