import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { getErrorTranslationData } from 'src/modules/shared/utils/get-error-translation-data';

@InputType()
export class UserLoginInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}
