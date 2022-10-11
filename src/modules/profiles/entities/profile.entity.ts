import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/modules/users/models/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
@ObjectType()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
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
