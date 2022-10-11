import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserTask } from 'src/modules/user-task/models/user-task.entity';
import { User } from 'src/modules/users/models/user.entity';
import { Validate } from 'class-validator';
import { ShouldExistValidator } from 'src/modules/shared/validators/should-exist-validator';
import { TasksService } from '../tasks.service';

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  // @Validate(ShouldExistValidator, [{ service: TasksService }])
  id: number;

  @Field()
  @Column()
  title: string;

  @Field(() => [User], { nullable: true })
  assignedTo: User[];

  @OneToMany(() => UserTask, (userTask) => userTask.task)
  public userTask!: UserTask[];
}
