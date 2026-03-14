import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/dto/registerUserDto.dto';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
 async registerUser(@Body() registerUserDto: RegisterUserDto) {
    // console.log("----->",registerUserDto)
    const createdUser = await this.authService.registerUser(registerUserDto);
    return createdUser;
  }
}
