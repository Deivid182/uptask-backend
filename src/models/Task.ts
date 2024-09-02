import mongoose, { Schema, Document, Types } from "mongoose";

export enum TaskStatus {
  PENDING = "pending",
  ON_HOLD = "onHold",
  IN_PROGRESS = "inProgress",
  UNDER_REVIEW = "underReview",
  COMPLETED = "completed",
}

export type TaskType = Document & {
  projectName: string
  description: string
  project: Types.ObjectId
  status: TaskStatus
}

const TaskSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description:{
    type:String,
    required:true,
    trim:true,
  },
  project: {
    type: Types.ObjectId,
    ref: 'Project',
  },
  status: {
    type: String,
    enum: TaskStatus,
    default: TaskStatus.PENDING
  }
}, {
  timestamps: true
})

const Task = mongoose.model<TaskType>('Task', TaskSchema)
export default Task