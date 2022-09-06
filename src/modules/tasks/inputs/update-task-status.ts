import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';

import { TaskStatus } from 'src/modules/shared/enums/task-status.enum';

@InputType()
export class UpdateTaskStatusInput {
  @Field(() => Int)
  id: number;

  @Field(() => TaskStatus)
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
