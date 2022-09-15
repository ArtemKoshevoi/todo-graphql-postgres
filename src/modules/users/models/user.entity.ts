import { Field, ObjectType } from '@nestjs/graphql';
import { UserRole } from 'src/modules/shared/enums/user-role.enum';
import { UserToTask } from 'src/modules/shared/models/user-to-task.entity';
import { Task } from 'src/modules/tasks/models/task.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  password?: string;

  @Field(() => [UserRole])
  @Column('enum', {
    enum: UserRole,
    array: true,
    default: [UserRole.User],
  })
  roles?: UserRole[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  token?: string;

  @Field(() => Profile)
  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    lazy: true,
  })
  profile: Promise<Profile> | Profile;

  @RelationId((user: User) => user.profile)
  readonly profileId?: number;

  // @ManyToMany(() => Task, (task) => task.users)
  // tasks: Task[];
  @OneToMany(() => UserToTask, (userToTask) => userToTask.user)
  public userToTasks!: UserToTask[];
}
