import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { TaskStatus, taskStatus } from '../schema/task.schema';

const MIN_LENGTH = 1;

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  @MinLength(MIN_LENGTH)
  @IsOptional()
  name?: string;
  
  @IsString()
  @MinLength(MIN_LENGTH)
  @IsOptional()
  description?: string;

  @IsEnum(taskStatus, { message: 'Status must be one of PENDING, ON_HOLD, IN_PROGRESS, UNDER_REVIEW, COMPLETED' })
  @IsOptional()
  status: TaskStatus;
}
