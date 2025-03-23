import { IsString, MinLength, IsEnum } from "class-validator"
import { TaskStatus } from "@prisma/client";

const MIN_LENGTH = 1;
export class CreateTaskDto {

  @IsString()
  @MinLength(MIN_LENGTH)
  name: string;

  @IsString()
  @MinLength(MIN_LENGTH)
  description: string;

  @IsEnum(TaskStatus, { message: 'Status must be one of PENDING, ON_HOLD, IN_PROGRESS, UNDER_REVIEW, COMPLETED' })
  status: TaskStatus;
}
