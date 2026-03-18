import { IsString } from 'class-validator';

export class EditProfileDto {
  @IsString()
  fname: string;

  @IsString()
  lname: string;
}
