import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserTask } from 'src/modules/user-task/models/user-task.entity';

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @Column()
  title: string;

  @OneToMany(() => UserTask, (userTask) => userTask.task)
  public userTask!: UserTask[];
}
