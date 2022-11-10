import { Field, ObjectType } from '@nestjs/graphql';
import { Document, SchemaTimestampsConfig, Types } from 'mongoose';

// import { User } from 'src/modules/users/models/user.entity';

@ObjectType()
export class Task {
  @Field()
  readonly id: Types.ObjectId;

  @Field(() => String)
  title: string;

  // @Field(() => [User], { nullable: true })
  // assignedTo: User[];

  //   @OneToMany(() => UserTask, (userTask) => userTask.task)
  //   public userTask!: UserTask[];
}

export type TaskDoc = Task & Document & SchemaTimestampsConfig;
