import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateAuthDto } from './models/dto/req/create-auth.dto';
import { UpdateAuthDto } from './models/dto/req/update-auth.dto';
import { AuthResDto } from './models/dto/res/auth.res.dto';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  public async create(
    @Body() createAuthDto: CreateAuthDto,
  ): Promise<AuthResDto> {
    return await this.authService.create(createAuthDto);
  }

  @Get()
  public async findAll(): Promise<AuthResDto> {
    return await this.authService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<AuthResDto> {
    return await this.authService.findOne(+id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateAuthDto: UpdateAuthDto,
  ): Promise<AuthResDto> {
    return await this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<AuthResDto> {
    return await this.authService.remove(+id);
  }
}
