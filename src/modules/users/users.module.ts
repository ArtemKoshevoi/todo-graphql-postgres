import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserQueryResolver } from './users.query.resolver';
import { Profile } from 'src/profiles/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  providers: [UsersService, UsersResolver, UserQueryResolver],
  exports: [UsersService],
})
export class UsersModule {}
