import {
  Args,
  Context,
  Mutation,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserSignUpInput } from './inputs/user-sign-up.input';
import { User } from '../users/models/user.entity';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from 'src/users/inputs/login-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // @Mutation(() => User)
  // @ResolveField()
  // async signUp(@Args('input') input: UserSignUpInput) {
  //   return this.authService.signUp(input);
  // }

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }
}
