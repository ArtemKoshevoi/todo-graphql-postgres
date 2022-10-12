import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Validate } from 'class-validator';
import { ShouldExistValidator } from 'src/modules/shared/validators/should-exist-validator';
import { User } from 'src/modules/users/models/user.entity';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
@ObjectType()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  username: string;

  @OneToOne(() => User, (user) => user.profile, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  user: Promise<User> | User;

  @Field()
  @RelationId((profile: Profile) => profile.user)
  readonly userId?: string;
}
