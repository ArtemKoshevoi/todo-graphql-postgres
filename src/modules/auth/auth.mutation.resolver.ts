import { UseGuards } from '@nestjs/common';
import { Args, Mutation, ResolveField, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { UserLoginInput } from './dto/user-login.input';
import { UserSignUpInput } from './dto/user-signup.input';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { AuthMutation } from './models/auth.mutation.model';

@Resolver(() => AuthMutation)
export class AuthMutationResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((of) => AuthMutation)
  async auth() {
    return {};
  }

  @ResolveField()
  async signUp(@Args('input') input: UserSignUpInput) {
    return this.authService.signUp(input);
  }

  @ResolveField()
  @UseGuards(GqlAuthGuard)
  login(@Args('input') input: UserLoginInput) {
    return this.authService.login(input);
  }
}
