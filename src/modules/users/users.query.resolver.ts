import { UseGuards } from '@nestjs/common';
import { Resolver, ResolveField, Args, Query } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../shared/decorators/roles.decortors';
import { UserRole } from '../shared/enums/user-role.enum';
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
  @Roles(UserRole.Admin)
  findAll() {
    return this.userService.findAll();
  }

  @ResolveField()
  @Roles(UserRole.Admin)
  findOne(@Args('username') username: string) {
    return this.userService.findOne(username);
  }
}
