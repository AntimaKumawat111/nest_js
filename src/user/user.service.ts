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
import bcrypt from 'bcrypt';
import {
  ForgotPasswordDto,
  ResetPasswordDto,
} from 'src/dto/forgotPasswordDto.dto';
import { EditProfileDto } from 'src/dto/editProfile.Dto';

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

  async getUserById(id: string) {
    const user = await this.userModule.findById(id).select('-password'); // remove password field
    return user;
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userModule.findOne({
      email: forgotPasswordDto.email,
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const OTP = Math.floor(100000 + Math.random() * 900000); //generate random otp

    user.resetOtp = OTP;
    user.expireOtp = Date.now() + 10 * 60 * 1000;

    await user.save();

    return {
      message: 'OTP generated',
      otp: OTP,
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.userModule.findOne({
      email: resetPasswordDto.email,
    });

    if (!user) {
      throw new BadRequestException('User not found!');
    }

    if (!user.resetOtp || !user.expireOtp) {
      throw new BadRequestException('OTP not generated');
    }

    if (user.resetOtp !== resetPasswordDto.otp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (user.expireOtp < Date.now()) {
      throw new BadRequestException('OTP expired');
    }

    const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10); // make new password hash
    user.password = hashedPassword; // update password with the new password
    user.resetOtp = null;
    user.expireOtp = null;
    await user.save();

    return { message: 'Password reset successfully!!' };
  }

  async editProfile(userId: string, editProfileDto: EditProfileDto) {
    const user = await this.getUserById(userId);
    console.log('user is', user);

    if (!user) {
      throw new BadRequestException('User not found!!');
    }

    if (!editProfileDto.fname || !editProfileDto.lname) return;

    user.fname = editProfileDto.fname;
    user.lname = editProfileDto.lname;

    await user.save();
    return user;
  }


  
}
