import { InputType } from '@nestjs/graphql';
import { AssignTaskInput } from './assign-task.input';

@InputType()
export class UnAssignTaskInput extends AssignTaskInput {}
