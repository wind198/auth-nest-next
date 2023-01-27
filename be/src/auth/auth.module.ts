import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { JwtModule } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LocalStrategy } from './local.strategy';

@Module({
  providers: [AuthService, LocalStrategy, LocalAuthGuard],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: '60s',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
