import { Injectable } from '@nestjs/common';

import { CreateUserReqDto } from '../models/dto/req/create-user.req.dto';
import { UpdateUserReqDto } from '../models/dto/req/update-user.req.dto';
import { UserResDto } from '../models/dto/res/user.res.dto';

@Injectable()
export class UsersService {
  public async create(dto: CreateUserReqDto): Promise<UserResDto> {
    return 'This action adds a new user' as unknown as UserResDto;
  }

  public async findAll(): Promise<UserResDto> {
    return `This action returns all users` as unknown as UserResDto;
  }

  public async findOne(id: number): Promise<UserResDto> {
    return `This action returns a #${id} user` as unknown as UserResDto;
  }

  public async update(id: number, dto: UpdateUserReqDto): Promise<UserResDto> {
    return `This action updates a #${id} user` as unknown as UserResDto;
  }

  public async remove(id: number): Promise<UserResDto> {
    return `This action removes a #${id} user` as unknown as UserResDto;
  }
}
