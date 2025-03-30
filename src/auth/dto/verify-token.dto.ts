
import { IsNotEmpty, IsString, Length } from "class-validator";

export class VerifyTokenDto {
  @IsNotEmpty()
  @IsString()
  @Length(6)
  token: string
}