import { Field, ObjectType } from '@nestjs/graphql';

import { User } from 'src/modules/users/models/user.entity';
import { LoginResponse } from '../dto/login-response';

@ObjectType({ description: 'AuthMutation' })
export class AuthMutation {
  @Field((type) => User, { description: 'User sign up' })
  readonly signUp: User;

  @Field((type) => LoginResponse, {
    description: 'Login and get user and token',
  })
  readonly login: LoginResponse;
}
