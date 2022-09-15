import { ObjectType } from '@nestjs/graphql';
import { Task } from 'src/modules/tasks/models/task.entity';
import { User } from 'src/modules/users/models/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TaskStatus } from '../enums/task-status.enum';

@Entity()
@ObjectType()
export class UserToTask {
  @PrimaryGeneratedColumn()
  public userToTaskId!: number;

  @Column()
  public userId!: number;

  @Column()
  public taskId!: number;

  @Column()
  public taskStatus!: TaskStatus;

  @ManyToOne(() => User, (user) => user.userToTasks)
  public user!: User;

  @ManyToOne(() => Task, (task) => task.userToTasks)
  public task!: Task;
}
