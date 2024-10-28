import { IsString, MinLength, IsEmail, IsStrongPassword } from "class-validator";

const MIN_LENGTH_NAME = 3;

export class CreateUserDto {

  @IsString()
  @MinLength(MIN_LENGTH_NAME)
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
