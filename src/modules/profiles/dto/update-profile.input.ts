import { CreateProfileInput } from './create-profile.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, Validate } from 'class-validator';
import { ShouldExistValidator } from 'src/modules/shared/validators/should-exist-validator';
import { ProfilesService } from '../profiles.service';

@InputType()
export class UpdateProfileInput extends PartialType(CreateProfileInput) {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  @Validate(ShouldExistValidator, [{ service: ProfilesService }])
  id: number;
}
