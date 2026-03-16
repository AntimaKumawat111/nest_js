import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { RegisterUserDto } from 'src/dto/registerUserDto.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { LoginUserDto } from 'src/dto/loginUserDto.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModule: Model<User>) {}

  async registerUser(registerUserDto: RegisterUserDto) {
    try {
      return await this.userModule.create({
        fname: registerUserDto.fname,
        lname: registerUserDto.lname,
        email: registerUserDto.email,
        password: registerUserDto.password,
      });
    } catch (error: any) {
      const DUPLICATE_KEY_VALUE = 11000;
      if (error.code === DUPLICATE_KEY_VALUE) {
        throw new NotAcceptableException(`Email already exists`);
      }

      return error;
    }
  }

  async getAllUser() {
    
    const users = await this.userModule.find(); // we can use .select("-password") for remove the password

    return users.map((user) => ({
      id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      password: user.password,
    }));
  }
}
