import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateProfileInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  readonly userName: string;
}
