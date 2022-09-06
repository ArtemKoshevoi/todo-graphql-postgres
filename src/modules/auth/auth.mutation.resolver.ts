import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LoginUserInput } from '../users/dto/login-user.input';
import { UserSignUpInput } from '../users/dto/user-sign-up.input';
import { AuthService } from './auth.service';
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
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }
}
