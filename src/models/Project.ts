import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { TaskType } from "./Task";

export interface ProjectType extends Document {
  projectName: string
  clienteName: string
  description: string
  tasks: PopulatedDoc<TaskType & Document>[]
}

const ProjectSchema: Schema = new Schema({
  projectName: {
    type: String,
    required: true,
    trim: true,
  },
  clientName: {
    type: String,
    required: true,
    trim: true,
  },
  description:{
    type:String,
    required:true,
    trim:true,
  },
  tasks: [
    {
      type: Types.ObjectId
    }
  ]
}, {
  timestamps: true
})

const Project = mongoose.model<ProjectType>('Project', ProjectSchema)
export default Project