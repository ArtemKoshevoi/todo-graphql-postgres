import { ObjectType, Field } from '@nestjs/graphql';

import { User } from 'src/modules/users/models/user.entity';

@ObjectType()
export class SignUpResponse {
  @Field(() => String)
  access_token: string;

  @Field(() => User)
  user: User;
}
