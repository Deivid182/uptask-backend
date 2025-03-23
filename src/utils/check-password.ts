import * as bcrypt from 'bcrypt'

export async function checkPassword(enteredPassword: string, hashedPassword: string) {
  return await bcrypt.compare(enteredPassword, hashedPassword)
}