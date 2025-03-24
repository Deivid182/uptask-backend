import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { VerifyAccountDto } from './dto/verify-account.dto';
import { EmailsService } from '../emails/emails.service';
import { generateToken, checkPassword } from '../utils';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly emailsService: EmailsService,
    private readonly prisma: PrismaService
  ){
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto

    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }


    if(!user.verified) {
      
      const token = generateToken()
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000)
      
      await this.prisma.token.create({
        data: {
          token,
          expiresAt,
          user: {
            connect: {
              id: user.id
            }
          }
        }
      })
      
      await this.emailsService.sendVerifyEmail(user.email, user.name, token)
      throw new UnauthorizedException('Account not verified, we have sent you an email to verify your email address')
    }

    const isPasswordValid = await checkPassword(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload = { sub: user.id, email: user.email }

    const accessToken = await this.jwtService.signAsync(payload)

    const { password: _, ...userWithoutPassword } = user

    return { accessToken, ...userWithoutPassword }
  }

  
  
  async verifyAccount(verifyAccountDto: VerifyAccountDto) {

    const { token } = verifyAccountDto
    const tokenFound = await this.prisma.token.findFirst({
      where: {
        token
      }
    })

    if(!tokenFound) {
      throw new UnauthorizedException('Invalid token')
    }


    await Promise.allSettled([
      this.prisma.user.update({
        where:  {
          id: tokenFound.userId
        },
        data: {
          verified: true
        }
      }),
      this.prisma.token.delete({
        where: {
          id: tokenFound.id
        }
      })
    ])

    return { message: 'Account verified successfully' }
  }
}
