import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserTask } from 'src/modules/user-task/models/user-task.entity';
import { User } from 'src/modules/users/models/user.entity';

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @Column()
  title: string;

  @Field(() => [User], { nullable: true })
  assignedTo: User[];

  @OneToMany(() => UserTask, (userTask) => userTask.task)
  public userTask!: UserTask[];
}
