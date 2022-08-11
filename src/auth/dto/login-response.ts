import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/models/user.entity';

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;

  @Field(() => User)
  user: User;
}