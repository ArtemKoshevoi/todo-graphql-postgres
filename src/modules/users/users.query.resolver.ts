import { UseGuards } from '@nestjs/common';
import { Resolver, ResolveField, Args, Query } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserQuery } from './models/user.query.modal';
import { UsersService } from './users.service';

@Resolver(() => UserQuery)
export class UserQueryResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => UserQuery)
  async user() {
    return {};
  }

  @ResolveField()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @ResolveField()
  findOne(@Args('username') username: string) {
    return this.userService.findOne(username);
  }
}
