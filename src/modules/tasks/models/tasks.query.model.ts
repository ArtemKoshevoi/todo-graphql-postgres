import { Field, ObjectType } from '@nestjs/graphql';
import { Task } from './task.model';

@ObjectType()
export class TasksQuery {
  @Field(() => [Task])
  readonly findAll: Task[];

  @Field(() => Task)
  readonly findOne: Task;

  // @Field(() => [Task], { description: 'Get user tasks' })
  // readonly getUserTasksByUserId: Task[];
}
