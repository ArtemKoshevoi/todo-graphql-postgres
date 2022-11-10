import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesResolver } from './profiles.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfilesSchema } from './models/schemas/profiles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Profile', schema: ProfilesSchema }]),
  ],
  providers: [ProfilesResolver, ProfilesService],
})
export class ProfilesModule {}
