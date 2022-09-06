import { Field, ObjectType } from '@nestjs/graphql';
import { Task } from './task.entity';

@ObjectType()
export class TasksQuery {
  @Field((type) => [Task])
  readonly findAll: [Task];

  @Field((type) => Task)
  readonly findOne: Task;
}
