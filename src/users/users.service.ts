import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as argon from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interfaces/user.interface';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) { }

  public async getUsers(): Promise<UserDto[]> {
    const users = await this.userModel.find({}).exec();
    return users;
  }

  public async createUser(newUser: UserDto) {
    const hash = await argon.hash(newUser.password);
    const user = await new this.userModel({
      ...newUser,
      password: hash,
    });
    return user.save();
  }
}
