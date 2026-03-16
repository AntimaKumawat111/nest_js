import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class RegisterUserDto {
  // @IsString()
  @IsNotEmpty()
  fname: string;

  // @IsString()
  @IsNotEmpty()
  lname: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
