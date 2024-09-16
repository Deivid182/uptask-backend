import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";

export const taskStatus = {
  PENDING: 'PENDING',
  ON_HOLD: 'ONHOLD',
  IN_PROGRESS: 'INPROGRESS',
  UNDER_REVIEW: 'UNDERREVIEW',
  COMPLETED: 'COMPLETED'
} as const

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus];

export interface ITask extends Document {
  name: string
  description: string
  project: Types.ObjectId
  status: TaskStatus
}

@Schema({
  timestamps: true
})

export class Task {
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
    required: true
  })
  description: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Project'
  })
  project: Types.ObjectId

  @Prop({
    type: String,
    enum: taskStatus,
    default: taskStatus.PENDING
  })
  status: string
}

export const TaskSchema = SchemaFactory.createForClass(Task);