import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/dto/registerUserDto.dto';

@Injectable()
export class UserService {
  registerUser(registerUserDto:RegisterUserDto) {

    console.log("registerUserDto is->",registerUserDto)
    return { message: 'registered successfuly!!!!!' };
  }
}
