import { Field, ObjectType } from '@nestjs/graphql';
import { of } from 'rxjs';
import { Task } from './task.entity';

@ObjectType({ description: 'TasksMutation' })
export class TasksMutation {
  @Field((of) => Task, { description: 'Create new task' })
  readonly createTask: Task;

  @Field((of) => Task, { description: 'Remove task' })
  readonly removeTask: Task;

  @Field((of) => Task, { description: 'Update status of the task' })
  readonly updateTaskStatus: Task;

  @Field((of) => Task, { description: 'Update title of the task' })
  readonly updateTaskTitle: Task;
}
