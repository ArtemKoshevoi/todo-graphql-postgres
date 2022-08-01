import { registerEnumType } from '@nestjs/graphql';

export enum TaskStatus {
  Todo = 'Todo',
  InProgress = 'InProgress',
  Completed = 'Completed',
}

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
  description: 'Task Status',
});
