import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TaskStatus } from 'src/modules/shared/enums/task-status.enum';
import { User } from 'src/modules/users/models/user.entity';
import { UserToTask } from 'src/modules/shared/models/user-to-task.entity';

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @Column()
  title: string;

  @OneToMany(() => UserToTask, (userToTask) => userToTask.task)
  public userToTasks!: UserToTask[];

  // @ManyToMany(() => User, (user) => user.tasks)
  // @JoinTable()
  // users: User[];

  // @Field(() => TaskStatus)
  // @Column('enum', {
  //   enum: TaskStatus,
  //   default: TaskStatus.Todo,
  // })
  // status: TaskStatus;
}
