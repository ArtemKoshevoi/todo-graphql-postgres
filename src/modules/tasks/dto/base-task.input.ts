import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsString, Validate } from 'class-validator';
import { ShouldExistValidator } from 'src/modules/shared/validators/should-exist-validator';
import { UsersService } from 'src/modules/users/users.service';
import { TasksService } from '../tasks.service';

@InputType()
export class BaseTaskInput {
  @Field(() => String)
  @IsString()
  @Validate(ShouldExistValidator, [{ service: TasksService }])
  taskId: string;

  @Field(() => String)
  @IsString()
  @Validate(ShouldExistValidator, [{ service: UsersService }])
  userId: string;
}
