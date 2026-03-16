import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { RegisterUserDto } from 'src/dto/registerUserDto.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/dto/loginUserDto.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // register the user
  async registerUser(registerUserDto: RegisterUserDto) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltRounds);
    await this.userService.registerUser({
      ...registerUserDto,
      password: hash,
    });

    return {
      message: 'User registered successfuly, Please login',
    };
  }

  async getAllUsers() {
    // get all users is for find a user in database
    return await this.userService.getAllUser();
  }

  async loginUser(loginUserDto: LoginUserDto) {
    try {
      const user = (await this.userService.getAllUser()).find(
        (u) => u.email === loginUserDto.email,
      );

      if (!user) {
        throw new BadRequestException('User not found');
      }

      // console.log('Entered password:', loginUserDto.password);
      // console.log('Stored password:', user?.password);

      const isMatch = await bcrypt.compare(
        loginUserDto?.password,
        user?.password,
      );

      // console.log('is password matched ?-', isMatch);

      if (!isMatch) {
        throw new BadRequestException('Invalid password');
      }

      const payload = { sub: user.id };

      const token = await this.jwtService.signAsync(payload);

      const { password, ...safeUser } = user; // here we are destructuring the password from user and other data stores in safeUser and then sand safeUser in the res. so response will not showing the password field

      return {
        message: 'Login successful',
        token,
        user: safeUser,
      };
    } catch (error) {
      throw new ConflictException(error.response);
    }
  }
}
