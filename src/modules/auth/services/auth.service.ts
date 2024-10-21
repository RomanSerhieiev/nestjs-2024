import { Injectable } from '@nestjs/common';

import { CreateAuthDto } from '../models/dto/req/create-auth.dto';
import { UpdateAuthDto } from '../models/dto/req/update-auth.dto';
import { AuthResDto } from '../models/dto/res/auth.res.dto';

@Injectable()
export class AuthService {
  public async create(dto: CreateAuthDto): Promise<AuthResDto> {
    return 'This action adds a new auth' as unknown as AuthResDto;
  }

  public async findAll(): Promise<AuthResDto> {
    return `This action returns all auth` as unknown as AuthResDto;
  }

  public async findOne(id: number): Promise<AuthResDto> {
    return `This action returns a #${id} auth` as unknown as AuthResDto;
  }

  public async update(id: number, dto: UpdateAuthDto): Promise<AuthResDto> {
    return `This action updates a #${id} auth` as unknown as AuthResDto;
  }

  public async remove(id: number): Promise<AuthResDto> {
    return `This action removes a #${id} auth` as unknown as AuthResDto;
  }
}
