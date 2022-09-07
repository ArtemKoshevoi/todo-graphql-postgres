import { Field, ObjectType } from '@nestjs/graphql';
import { Task } from './task.entity';

@ObjectType({ description: 'TasksMutation' })
export class TasksMutation {
  @Field((of) => Task, { description: 'Create new task' })
  readonly createTask: Task;

  @Field((of) => Task, { nullable: true, description: 'Remove task' })
  readonly removeTask: Task;

  @Field((of) => Task, { description: 'Update task' })
  readonly updateTask: Task;
}
