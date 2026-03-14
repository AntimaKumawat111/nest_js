import { ConflictException, Injectable, NotAcceptableException } from '@nestjs/common';
import { RegisterUserDto } from 'src/dto/registerUserDto.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

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
      console.log("errorrrr",error)
      if(error.code === 11000){
        throw new NotAcceptableException(`Email already exists` )
      }

      return error
    }
  }
}
