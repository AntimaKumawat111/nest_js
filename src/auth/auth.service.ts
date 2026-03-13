import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/dto/registerUserDto.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from "bcrypt"
@Injectable()
export class AuthService {
  // constructor(private readonly authService: AuthService) {}
  constructor(private readonly userService: UserService) {}

 async registerUser(registerUserDto:RegisterUserDto) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password,saltRounds)
    console.log("hash is",hash)
    return this.userService.registerUser({...registerUserDto, password: hash});
  }
}
