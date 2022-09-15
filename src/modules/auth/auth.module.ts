import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { User } from '../users/models/user.entity';
import { UsersModule } from '../users/users.module';
import { JwtConfigService } from '../core/jwt/jwt-config.service';
import { AuthMutationResolver } from './auth.mutation.resolver';
import { Profile } from 'src/profiles/entities/profile.entity';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { UserToTask } from '../shared/models/user-to-task.entity';

@Module({
  imports: [
    UsersModule,
    ProfilesModule,
    TypeOrmModule.forFeature([User, Profile, UserToTask]),
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    AuthMutationResolver,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
