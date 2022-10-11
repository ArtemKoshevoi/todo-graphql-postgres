import { Field, InputType, Int } from '@nestjs/graphql';
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
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  @Validate(ShouldExistValidator, [{ service: TasksService }])
  id: number;

  @Field()
  @IsOptional()
  @IsString()
  title: string;
}
