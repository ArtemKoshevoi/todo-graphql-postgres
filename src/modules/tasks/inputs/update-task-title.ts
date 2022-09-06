import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTaskTitleInput {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;
}
