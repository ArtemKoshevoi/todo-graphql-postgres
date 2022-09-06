import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';

import { TaskStatus } from 'src/modules/shared/enums/task-status.enum';
import { CreateTaskInput } from './create-task.input';

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field(() => Int)
  id: number;

  @Field(() => TaskStatus)
  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;
}
