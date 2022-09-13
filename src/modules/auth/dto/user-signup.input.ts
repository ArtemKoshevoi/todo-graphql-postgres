import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsArray, IsString, ValidateNested } from 'class-validator';
import { UserRole } from 'src/modules/shared/enums/user-role.enum';
import { CreateProfileInput } from 'src/profiles/dto/create-profile.input';

@InputType()
export class UserSignUpInput {
  @Field((type) => [UserRole])
  @IsNotEmpty()
  @IsArray()
  readonly roles?: UserRole[];

  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;

  @Field()
  @Type(() => CreateProfileInput)
  @IsNotEmpty()
  @ValidateNested()
  profile: CreateProfileInput;
}
