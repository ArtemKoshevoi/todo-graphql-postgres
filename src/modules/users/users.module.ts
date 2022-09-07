import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserQueryResolver } from './user.query.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersResolver, UserQueryResolver],
  exports: [UsersService],
})
export class UsersModule {}
