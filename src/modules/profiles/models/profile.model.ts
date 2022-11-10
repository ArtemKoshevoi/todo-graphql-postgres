import { Field, ObjectType } from '@nestjs/graphql';
import { Document, SchemaTimestampsConfig, Types } from 'mongoose';

@ObjectType()
export class Profile {
  @Field()
  readonly _id: Types.ObjectId;

  @Field(() => String)
  username: string;

  @Field()
  readonly userId: Types.ObjectId;
}

export type ProfileDoc = Profile & Document;
