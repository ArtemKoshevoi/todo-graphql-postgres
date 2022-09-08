import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';

import { TaskStatus } from 'src/modules/shared/enums/task-status.enum';

@InputType()
export class UpdateTaskInput {
  @Field(() => Int)
  id: number;

  @Field(() => TaskStatus)
  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;

  @Field()
  @IsOptional()
  title: string;
}
