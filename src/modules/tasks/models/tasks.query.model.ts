import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/users/models/user.entity';
import { Task } from './task.entity';

@ObjectType()
export class TasksQuery {
  @Field(() => [Task])
  readonly findAll: Task[];

  @Field(() => Task)
  readonly findOne: Task;

  @Field(() => [Task], { description: 'Get user tasks' })
  readonly getUserTasksByUserId: Task[];
}
