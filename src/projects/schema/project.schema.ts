import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types, Document, PopulatedDoc } from "mongoose";
import { ITask } from "src/tasks/schema/task.schema";

export interface IProject extends Document {
  projectName: string
  clientName: string
  description: string
  tasks: PopulatedDoc<ITask & Document>[]
}

@Schema({
  timestamps: true,
})

export class Project {
  @Prop({
    type: SchemaTypes.ObjectId,
    auto: true
  })
  _id: Types.ObjectId

  @Prop({
    type: String,
    required: true
  })
  projectName: string;

  @Prop({
    type: String,
    required: true
  })
  clientName: string;

  @Prop({
    type: String,
    required: true
  })
  description: string;

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: 'Task'
  })
  tasks: Types.ObjectId[]
}

export const ProjectSchema = SchemaFactory.createForClass(Project);