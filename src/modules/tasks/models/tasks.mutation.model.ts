import { Field, ObjectType } from '@nestjs/graphql';
// import { UserTask } from 'src/modules/user-task/models/user-task.entity';
import { Task } from './task.model';

@ObjectType({ description: 'TasksMutation' })
export class TasksMutation {
  @Field((of) => Task, { description: 'Create new task' })
  readonly createTask: Task;

  @Field((of) => Task, { nullable: true, description: 'Remove task' })
  readonly removeTask: Task;

  @Field((of) => Task, { description: 'Update task' })
  readonly updateTask: Task;

  // @Field((of) => UserTask, { description: 'Assign task to user' })
  // readonly assignTask: UserTask;

  // @Field((of) => Boolean, { description: 'Unassign task' })
  // readonly unAssignTask: boolean;

  // @Field((of) => [Task], { description: 'Get all user tasks' })
  // readonly getUserTasks: Task[];
}
