import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { ShouldExistValidator } from 'src/modules/shared/validators/should-exist-validator';
import { TasksService } from '../tasks.service';

@InputType()
export class UpdateTaskInput {
  @Field(() => String)
  @IsNumber()
  @IsNotEmpty()
  @Validate(ShouldExistValidator, [{ service: TasksService }])
  id: string;
  @Field(() => String)
  @IsOptional()
  @IsString()
  title: string;
}
