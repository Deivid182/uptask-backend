import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
export interface IUser extends Document {
  email: string
  password: string
  name: string
  verified: boolean
}

@Schema({
  timestamps: true
})

export class User {
  @Prop({
    type: SchemaTypes.ObjectId,
    auto: true
  })
  _id: Types.ObjectId

  @Prop({
    type: String,
    required: true
  })
  name: string;

  @Prop({
    type: String,
    unique: true,
    lowercase: true,
    required: true
  })
  email: string;

  @Prop({
    type: String,
    required: true
  })
  password: string;

  @Prop({
    type: Boolean,
    default: false
  })
  verified: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);