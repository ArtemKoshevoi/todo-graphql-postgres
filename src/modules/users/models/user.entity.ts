import { Field, ObjectType } from '@nestjs/graphql';
import { UserRole } from 'src/modules/shared/enums/user-role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  username: string;

  @Column({ nullable: true })
  password?: string;

  @Field(() => [UserRole], { nullable: true })
  @Column('enum', {
    enum: UserRole,
    array: true,
    default: [],
  })
  roles?: UserRole[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  token?: string;
}
