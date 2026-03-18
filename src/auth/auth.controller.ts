import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/dto/registerUserDto.dto';
import { AuthGuard } from './auth.guard';
import { LoginUserDto } from 'src/dto/loginUserDto.dto';
import { UserService } from 'src/user/user.service';
import {
  ForgotPasswordDto,
  ResetPasswordDto,
} from 'src/dto/forgotPasswordDto.dto';
import { EditProfileDto } from 'src/dto/editProfile.Dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

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
    const userId = req.user.sub;
    const user = await this.userService.getUserById(userId);
    // console.log('------> user is', user);
    return { message: 'Profile details', user };
  }

  @Post('forgot-password')
  async forgetPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userService.forgotPassword(forgotPasswordDto);
    return user;
  }

  @UseGuards(AuthGuard)
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.userService.resetPassword(resetPasswordDto);
  }

  @UseGuards(AuthGuard)
  @Post('edit-profile')
  async editProfile(@Request() req, @Body() editProfileDto: EditProfileDto) {
    const user = await this.userService.editProfile(
      req.user.sub,
      editProfileDto,
    );
    console.log('----userrr', user);

    return { message: 'Profile update successfully!!', user };
  }
}
