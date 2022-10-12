import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateProfileInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  readonly userName: string;
}
