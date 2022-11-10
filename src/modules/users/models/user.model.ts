import { Field, ObjectType } from '@nestjs/graphql';
import { UserRole } from 'src/modules/shared/enums/user-role.enum';
import { SchemaTimestampsConfig, Types } from 'mongoose';
import { Profile } from 'src/modules/profiles/models/profile.model';

@ObjectType()
export class User {
  @Field()
  readonly _id: Types.ObjectId;

  @Field(() => [UserRole])
  roles?: UserRole[];

  @Field({ nullable: true })
  token?: string;

  @Field(() => Profile, { nullable: true })
  profile: Promise<Profile> | Profile;

  password?: string;
}

export type UserDoc = User & Document & SchemaTimestampsConfig;
