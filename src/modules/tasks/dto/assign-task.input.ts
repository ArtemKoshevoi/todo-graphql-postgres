import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AssignTaskInput {
  @Field(() => Int)
  taskId: number;

  @Field()
  userId: string;
}
