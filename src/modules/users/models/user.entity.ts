import { Field, ObjectType } from '@nestjs/graphql';
import { UserRole } from 'src/modules/shared/enums/user-role.enum';
import { Profile } from 'src/profiles/entities/profile.entity';
import {
  Column,
  Entity,
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

  // @Column()
  // @Field()
  // username: string;

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
}
