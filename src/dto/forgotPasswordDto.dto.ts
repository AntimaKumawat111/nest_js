import { Prop } from '@nestjs/mongoose';
import { IsEmail, IsNumber, IsString, IsStrongPassword } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @IsNumber()
  otp: number;

  @IsStrongPassword()
  newPassword: string;
}
