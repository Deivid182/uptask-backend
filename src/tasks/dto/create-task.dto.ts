import { IsString, MinLength, IsEnum } from "class-validator"

const MIN_LENGTH = 1;
export class CreateTaskDto {

  @IsString()
  @MinLength(MIN_LENGTH)
  name: string;

  @IsString()
  @MinLength(MIN_LENGTH)
  description: string;
}
