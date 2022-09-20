import { Field, ObjectType } from '@nestjs/graphql';
import { UserRole } from 'src/modules/shared/enums/user-role.enum';
import { UserTask } from 'src/modules/user-task/models/user-task.entity';
import { Profile } from 'src/modules/profiles/entities/profile.entity';
import {
  Column,
  Entity,
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

  @OneToMany(() => UserTask, (userTask) => userTask.user)
  public userTask!: UserTask[];
}
