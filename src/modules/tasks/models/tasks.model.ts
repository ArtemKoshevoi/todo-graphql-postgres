import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/modules/users/models/user.entity';

@ObjectType({ description: 'Tasks' })
export class Tasks {
  @Field(() => [User], { nullable: true })
  assignedTo: User[];
}
