import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class AuthBaseDto {
  @ApiProperty({ description: 'User email address' })
  @IsEmail()
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  readonly email: string;

  @ApiProperty({ description: 'User password' })
  @IsString()
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  readonly password: string;

  @ApiProperty({ description: 'Indicates if the user is verified' })
  @IsBoolean()
  readonly isVerified: boolean;

  @ApiProperty({ description: 'Date when the account was created', type: Date })
  @IsDate()
  @Type(() => Date)
  readonly createdAt: Date;

  @ApiProperty({
    description: 'Date when the account was last updated',
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  readonly updatedAt: Date;
}
