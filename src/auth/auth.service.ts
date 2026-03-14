import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/dto/registerUserDto.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  // constructor(private readonly authService: AuthService) {}
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltRounds);
    const user = await this.userService.registerUser({
      ...registerUserDto,
      password: hash,
    });

    const payload = { sub: user._id };

    const token = await this.jwtService.signAsync(payload);
    return { token: token, ...registerUserDto };
  }
}
