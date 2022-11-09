import { Field, ObjectType } from '@nestjs/graphql';
import { Document, SchemaTimestampsConfig, Types } from 'mongoose';
// import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserTask } from 'src/modules/user-task/models/user-task.entity';
import { User } from 'src/modules/users/models/user.entity';

// @Entity()
@ObjectType()
export class Task {
  // @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Field(() => String)
  // @Column()
  title: string;

  @Field(() => [User], { nullable: true })
  assignedTo: User[];

  // @OneToMany(() => UserTask, (userTask) => userTask.task)
  // public userTask!: UserTask[];
}

export type TaskDoc = Task & Document & SchemaTimestampsConfig;
