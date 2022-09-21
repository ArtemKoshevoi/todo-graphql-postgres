import { Field, ObjectType } from '@nestjs/graphql';
import { UserTask } from 'src/modules/user-task/models/user-task.entity';
import { Task } from './task.entity';

@ObjectType({ description: 'TasksMutation' })
export class TasksMutation {
  @Field((of) => Task, { description: 'Create new task' })
  readonly createTask: Task;

  @Field((of) => Task, { nullable: true, description: 'Remove task' })
  readonly removeTask: Task;

  @Field((of) => Task, { description: 'Update task' })
  readonly updateTask: Task;

  @Field((of) => UserTask, { description: 'Assign task to user' })
  readonly assignTask: UserTask;

  @Field((of) => UserTask, { description: 'Unassign task' })
  readonly unAssignTask: UserTask;

  @Field((of) => [Task], { description: 'Get all user tasks' })
  readonly getUserTasks: Task[];
}
