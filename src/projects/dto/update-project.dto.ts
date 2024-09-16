import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

const MIN_LENGTH = 1;

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsString()
  @MinLength(MIN_LENGTH)
  @IsOptional()
  projectName?: string;
  
  @IsString()
  @MinLength(MIN_LENGTH)
  @IsOptional()
  clientName?: string;
  
  @IsString()
  @MinLength(MIN_LENGTH)
  @IsOptional()
  description?: string;

}
