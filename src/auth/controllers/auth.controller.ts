import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

import {AuthService} from '../services/auth.service';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from '../dtos/login.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}
  
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: LoginDto })
  login(@Req() req: Request, @Body() loginDto: LoginDto) {
    const user = (req as any).user as User
    return this.authService.generateJwt(user);
  }
}