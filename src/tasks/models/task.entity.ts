import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TaskStatus } from 'src/shared/enums/task-status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
