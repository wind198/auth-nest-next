import { Module } from '@nestjs/common';
import { MongooseModule, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserSchema } from './schema/user.schema';
import { UsersService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {
  constructor(private userService: UsersService) {
    this.userService.addOne({
      email: 'tuanbk1908@gmail.com',
      password: 'abc123',
    });
  }
}
