import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserQueryResolver } from './users.query.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './schemas/users.shema';
import { ProfilesSchema } from '../profiles/models/schemas/profiles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Users', schema: UsersSchema },
      // { name: 'Profiles', schema: ProfilesSchema },
    ]),
  ],

  providers: [UsersService, UsersResolver, UserQueryResolver],
  exports: [UsersService],
})
export class UsersModule {}
