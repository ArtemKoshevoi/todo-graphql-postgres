import { ObjectType, Field } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class UserQuery {
  @Field((type) => [User])
  readonly findAll: User[];

  @Field((type) => User)
  readonly findOne: User;
}
