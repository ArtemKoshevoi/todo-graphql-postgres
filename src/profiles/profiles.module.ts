import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesResolver } from './profiles.resolver';
import { Profile } from './entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  providers: [ProfilesResolver, ProfilesService],
})
export class ProfilesModule {}
