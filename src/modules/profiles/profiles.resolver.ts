import { Resolver } from '@nestjs/graphql';
import { Profile } from './models/profile.model';

@Resolver((of) => Profile)
export class ProfilesResolver {}
