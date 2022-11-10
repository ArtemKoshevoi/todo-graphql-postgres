import { Field, ObjectType } from '@nestjs/graphql';
import { UserRole } from 'src/modules/shared/enums/user-role.enum';
// import { UserTask } from 'src/modules/user-task/models/user-task.entity';
import { SchemaTimestampsConfig, Types } from 'mongoose';
import { Profile } from 'src/modules/profiles/models/profile.model';

@ObjectType()
export class User {
  @Field()
  // readonly _id: Types.ObjectId;
  readonly _id: string;

  @Field(() => [UserRole])
  roles?: UserRole[];

  @Field({ nullable: true })
  token?: string;

  @Field(() => Profile, { nullable: true })
  profile: Promise<Profile> | Profile;

  password?: string;

  // @RelationId((user: User) => user.profile)
  // readonly profileId?: number;

  // @OneToMany(() => UserTask, (userTask) => userTask.user)
  // public userTask!: UserTask[];
}

export type UserDoc = User & Document & SchemaTimestampsConfig;
