import { Resolver } from '@nestjs/graphql';
import { Profile } from './entities/profile.entity';

@Resolver(() => Profile)
export class ProfilesResolver {}
