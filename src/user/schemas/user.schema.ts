import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../user.types';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ require: true })
  fname: string;

  @Prop({ require: true })
  lname: string;

  @Prop({ require: true, unique: true })
  email: string;

  @Prop({ require: true })
  password: string;

  @Prop({ default: Role.Student })
  role: string;

  @Prop({ type: Number, default: null })
  resetOtp: number | null;

  @Prop({ type: Number, default: null })
  expireOtp: number | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
