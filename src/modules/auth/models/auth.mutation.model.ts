import { Field, ObjectType } from '@nestjs/graphql';

import { LoginResponse } from '../dto/login-response';
import { SignUpResponse } from '../dto/signup-response';

@ObjectType({ description: 'AuthMutation' })
export class AuthMutation {
  @Field((type) => SignUpResponse, {
    description: 'User sign up and get user and token',
  })
  readonly signUp: SignUpResponse;

  @Field((type) => LoginResponse, {
    description: 'Login and get user and token',
  })
  readonly login: LoginResponse;
}
