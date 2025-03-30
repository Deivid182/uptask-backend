import { Equals, IsIn, IsString, IsStrongPassword, Matches, ValidateIf } from 'class-validator'

export class UpdatePasswordDto {

  // validar que password y passwordConfirmation sean iguales
  @IsString()
  @IsStrongPassword()
  password: string

  @IsString()
  @Matches('password')
  @ValidateIf((o) => o.password !== o.passwordConfirmation)
  passwordConfirmation: string
}

