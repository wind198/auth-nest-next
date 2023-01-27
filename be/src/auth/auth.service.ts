import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    /**
     * If username and password match
     * strip off the password and return other info as public
     */
    /**
     * ! Password should be hashed in production
     */
    if (user && user.password === password) {
      const { password, ...publicInfo } = user;
      return publicInfo;
    }

    return null;
  }

  async login(user: any) {
    /**
     * This payload is extracted from request, which is added by local strategy
     */
    const payload = {
      email: user.email,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
