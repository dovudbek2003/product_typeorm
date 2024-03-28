import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject('IAuthService') private readonly authService: AuthService) { }

  @Post()
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto)
  }
}
