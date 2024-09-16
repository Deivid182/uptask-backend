import { IsEnum } from "class-validator";
import { TaskStatus, taskStatus } from "src/tasks/schema/task.schema";

export class UpdateTaskStatusDto {
  @IsEnum(taskStatus, {
    message: 'Invalid status'
  })
  status: TaskStatus
}