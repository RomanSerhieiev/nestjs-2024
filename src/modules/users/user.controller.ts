import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { ApiFile } from '../../common/decorators/api-file.decorator';
import { UserID } from '../../database/entities/types/id.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { QueryUserReqDto } from './models/dto/req/query-user.req.dto';
import { UpdateUserReqDto } from './models/dto/req/update-user.req.dto';
import { UserResDto } from './models/dto/res/user.res.dto';
import { UserListResDto } from './models/dto/res/user-list.res.dto';
import { IUserData } from './models/interfaces/user-data.interface';
import { UserService } from './services/user.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('me')
  public async findMe(@CurrentUser() userData: IUserData): Promise<UserResDto> {
    return await this.usersService.findMe(userData.userId);
  }

  @Patch('me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateUserReqDto,
  ): Promise<UserResDto> {
    return await this.usersService.updateMe(userData.userId, dto);
  }

  @Delete('me')
  public async removeMe(@CurrentUser() userData: IUserData): Promise<void> {
    await this.usersService.removeMe(userData.userId);
  }

  @SkipAuth()
  public async findAll(@Query() query: QueryUserReqDto): Promise<UserListResDto> {
    //TODO findAll
    return await this.usersService.findAll(query);
  }

  @SkipAuth()
  @Get(':userId')
  public async findOne(@Param('userId', ParseUUIDPipe) userId: UserID): Promise<UserResDto> {
    return await this.usersService.findOne(userId);
  }

  @Post('me/avatar')
  @ApiConsumes('multipart/form-data')
  @ApiFile('avatar', false, true)
  @UseInterceptors(FileInterceptor('avatar'))
  public async uploadAvatar(
    @CurrentUser() userData: IUserData,
    @UploadedFile() avatar: Express.Multer.File,
  ): Promise<void> {
    await this.usersService.uploadAvatar(userData.userId, avatar);
  }

  @Delete('me/avatar')
  public async deleteAvatar(@CurrentUser() userData: IUserData): Promise<any> {
    return await this.usersService.deleteAvatar(userData.userId);
  }

  @Post(':userId/follow')
  public async follow(
    @Param('userId', ParseUUIDPipe) userId: UserID,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.usersService.follow(userData.userId, userId);
  }

  @Delete(':userId/follow')
  public async unfollow(
    @Param('userId', ParseUUIDPipe) userId: UserID,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.usersService.unfollow(userData.userId, userId);
  }
}
