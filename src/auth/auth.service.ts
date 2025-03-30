import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { EmailsService } from '../emails/emails.service';
import { generateToken, checkPassword } from '../utils';
import { VerifyTokenDto, VerifyAccountDto, LoginDto, UpdatePasswordDto } from './dto';
import { User } from '@prisma/client';

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

    const now = new Date()
    if(tokenFound.expiresAt < now) {
      throw new UnauthorizedException('Token expired')
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

  async verifyToken(verifyTokenDto: VerifyTokenDto) {
    const { token } = verifyTokenDto

    const tokenFound = await this.prisma.token.findFirst({
      where: {
        token
      }
    })

    if(!tokenFound) {
      throw new UnauthorizedException('Invalid token')
    }

    const now = new Date()
    if(tokenFound.expiresAt < now) {
      throw new UnauthorizedException('Token expired')
    }

    return { message: 'Token is valid' }
  }

  async forgotPassword(email: string) {
    const user = await this.findUser(email)

    // console.log(user)

    return await this.requestNewToken(user)
  }

  async findUser(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if(!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async requestNewToken(user: User) {

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

    await this.emailsService.sendPasswordResetToken(user.email, user.name, token)

    return { message: 'Email sent successfully' }
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto & VerifyTokenDto) {

    // const { password, passwordConfirmation, token } = updatePasswordDto

    // console.log(updatePasswordDto)

    return updatePasswordDto

  }
}
