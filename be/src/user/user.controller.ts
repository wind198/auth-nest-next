import { UseGuards, Get, Controller, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Get('')
  getAllUserProfile() {
    return this.userService.getAllUsers();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserProfile(@Param('id') userId: string) {
    return this.userService.getUserProfile(userId);
  }
}
