import { InputType } from '@nestjs/graphql';
import { BaseTaskInput } from './base-task.input';

@InputType()
export class AssignTaskInput extends BaseTaskInput {}
