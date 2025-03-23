import { Injectable, ConflictException } from '@nestjs/common';
import { hash } from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EmailsService } from '../emails/emails.service';
import { generateToken, hashPassword } from '../utils';

@Injectable()
export class UsersService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailsService: EmailsService
  ){}
  

  async createAccount(createUserDto: CreateUserDto) {

    const foundUser = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email
      }
    })

    if(foundUser) {
      throw new ConflictException('Email already exists')
    }

    
    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await hashPassword(createUserDto.password)
      },
    })

    const token = generateToken()
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

    await this.prisma.token.create({
      data: {
        token,
        expiresAt,
        user: {
          connect: {
            id: newUser.id
          }
        }
      }
    })

    await this.emailsService.sendVerifyEmail(newUser.email, newUser.name, token)
    
    const { password, ...user } = newUser
    return user
  }


}
