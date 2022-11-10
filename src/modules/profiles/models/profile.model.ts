import { Field, ObjectType } from '@nestjs/graphql';
import { Document, SchemaTimestampsConfig, Types } from 'mongoose';

@ObjectType()
export class Profile {
  @Field()
  // readonly _id: Types.ObjectId;
  readonly _id: string;

  @Field(() => String)
  username: string;

  @Field()
  // readonly userId: Types.ObjectId;
  readonly userId: string;
}

export type ProfileDoc = Profile & Document;
