import { ObjectType, Field } from '@nestjs/graphql';
import { Task } from 'src/modules/tasks/models/task.entity';
import { User } from 'src/modules/users/models/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TaskStatus } from '../../shared/enums/task-status.enum';

@Entity()
@ObjectType()
export class UserTask {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field(() => String)
  userId: string;

  @Column({ nullable: true })
  @Field(() => String)
  taskId: string;

  @Column('enum', {
    enum: TaskStatus,
    default: TaskStatus.Todo,
  })
  @Field(() => TaskStatus, { nullable: true })
  taskStatus: TaskStatus;

  @ManyToOne(() => User, (user) => user.userTask)
  user: User;

  // @ManyToOne(() => Task, (task) => task.userTask)
  // task: Task;
}
