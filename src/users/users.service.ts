import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ){}
  async createAccount(createUserDto: CreateUserDto) {

    const existEmail = await this.userModel.findOne({ email: createUserDto.email })

    if(existEmail) {
      throw new ConflictException('Email already exists')
    }

    const newUser = new this.userModel({
      ...createUserDto,
      password: await hash(createUserDto.password, 10) 
    })

    return await newUser.save()
    
  }

  findAll() {
  }

  findOne(id: number) {
  }

  update(id: number, updateUserDto: UpdateUserDto) {
  }

  remove(id: number) {
  }
}
