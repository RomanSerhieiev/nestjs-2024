import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConflictResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserReqDto } from './models/dto/req/create-user.req.dto';
import { UpdateUserReqDto } from './models/dto/req/update-user.req.dto';
import { UserResDto } from './models/dto/res/user.res.dto';
import { UsersService } from './services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiConflictResponse({ description: 'Conflict' })
  @Post()
  public async create(@Body() dto: CreateUserReqDto): Promise<UserResDto> {
    return await this.usersService.create(dto);
  }

  @Get()
  public async findAll(): Promise<UserResDto> {
    throw new UnprocessableEntityException('asdf');
    return await this.usersService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<UserResDto> {
    return await this.usersService.findOne(+id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserReqDto,
  ): Promise<UserResDto> {
    return await this.usersService.update(+id, dto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<UserResDto> {
    return await this.usersService.remove(+id);
  }
}
