import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ require: true })
  fname: string;

  @Prop()
  lname: string;

  @Prop({ require: true })
  email: string;

  @Prop({ require: true })
  password: string;

  @Prop({ require: true })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
