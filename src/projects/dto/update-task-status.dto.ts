import { IsEnum } from "class-validator";
import { TaskStatus } from "@prisma/client";

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus, { message: 'Status must be one of PENDING, ON_HOLD, IN_PROGRESS, UNDER_REVIEW, COMPLETED' })
  status: TaskStatus
}