import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findOneByEmail(email: string) {
    return this.userModel.findOne({ email: email });
  }

  addOne(dto: CreateUserDto) {
    const { email, password } = dto;
    return new this.userModel({
      email,
      password,
    }).save();
  }

  getUserProfile(userId: string) {
    return this.userModel.findById(userId);
  }
  getAllUsers() {
    return this.userModel.find();
  }
}
