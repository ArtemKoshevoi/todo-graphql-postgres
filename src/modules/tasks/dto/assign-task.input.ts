import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsString, Validate } from 'class-validator';
import { ShouldExistValidator } from 'src/modules/shared/validators/should-exist-validator';
import { TasksService } from '../tasks.service';

@InputType()
export class AssignTaskInput {
  @Field(() => Int)
  @IsNumber()
  @Validate(ShouldExistValidator, [{ service: TasksService, prop: 'taskId' }])
  taskId: number;

  @Field()
  @IsString()
  @Validate(ShouldExistValidator, [{ service: TasksService, prop: 'userId' }])
  userId: string;
}
