import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/dto/registerUserDto.dto';
import { AuthGuard } from './auth.guard';
import { LoginUserDto } from 'src/dto/loginUserDto.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    const createdUser = await this.authService.registerUser(registerUserDto);
    return createdUser;
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const loginUser = await this.authService.loginUser(loginUserDto);
    return loginUser;
  }

  @UseGuards(AuthGuard) // it is making routes secure
  @Get('profile')
  async getProfile(@Request() req) {
    return  req.user;
  }
}
