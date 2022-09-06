import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TaskStatus } from 'src/modules/shared/enums/task-status.enum';

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @Column()
  title: string;

  @Field(() => TaskStatus)
  @Column('enum', {
    enum: TaskStatus,
    default: TaskStatus.Todo,
  })
  status: TaskStatus;
}
