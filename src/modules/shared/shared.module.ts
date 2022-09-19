import { Global, Module } from '@nestjs/common';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { AuthModule } from '../auth/auth.module';
import { LoggerModule } from '../logger/logger.module';
import { TasksModule } from '../tasks/tasks.module';
import { UserTaskModule } from '../user-task/user-task.module';
import { UsersModule } from '../users/users.module';

const guards = [];
const providers = [];
const services = [];
const modules = [
  TasksModule,
  LoggerModule,
  AuthModule,
  UsersModule,
  ProfilesModule,
  UserTaskModule,
];

@Global()
@Module({
  imports: [...modules],
  providers: [...guards, ...providers, ...services],
  exports: [...modules, ...providers, ...services],
})
export class SharedModule {}
