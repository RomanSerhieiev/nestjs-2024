import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConflictResponse, ApiTags } from '@nestjs/swagger';

import { IUserData } from '../users/models/interfaces/user-data.interface';
import { CurrentUser } from './decorators/current-user.decorator';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { SignInReqDto } from './models/dto/req/sign-in.req.dto';
import { SignUpReqDto } from './models/dto/req/sign-up.req.dto';
import { AuthResDto } from './models/dto/res/auth.res.dto';
import { TokenPairResDto } from './models/dto/res/token-pair.res.dto';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @ApiConflictResponse({ description: 'Conflict' })
  @Post('sign-up')
  public async signUp(@Body() dto: SignUpReqDto): Promise<AuthResDto> {
    return await this.authService.signUp(dto);
  }

  @SkipAuth()
  @ApiConflictResponse({ description: 'Conflict' })
  @Put('sign-up')
  public async verify(): Promise<any> {
    //TODO verify
    return await this.authService.verify();
  }

  @SkipAuth()
  @Post('sign-in')
  public async signIn(@Body() dto: SignInReqDto): Promise<AuthResDto> {
    return await this.authService.signIn(dto);
  }

  @ApiBearerAuth()
  @Post('sign-out/current-device')
  public async signOutCurrentDevice(@CurrentUser() userData: IUserData): Promise<void> {
    return await this.authService.signOut(userData);
  }

  @ApiBearerAuth()
  @Post('sign-out/all-devices')
  public async signOutAllDevices(@CurrentUser() userData: IUserData): Promise<void> {
    return await this.authService.signOut(userData, true);
  }

  @SkipAuth()
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  public async refresh(@CurrentUser() userData: IUserData): Promise<TokenPairResDto> {
    return await this.authService.refresh(userData);
  }

  @ApiBearerAuth()
  @Post('password/change')
  public async changePassword(): Promise<any> {
    //TODO changePassword
    return await this.authService.changePassword();
  }

  @SkipAuth()
  @Post('password/forgot')
  public async forgotPassword(): Promise<any> {
    //TODO forgotPassword
    return await this.authService.forgotPassword();
  }

  @SkipAuth()
  @Put('password/forgot')
  public async setPassword(): Promise<any> {
    //TODO setPassword
    return await this.authService.setPassword();
  }
}
