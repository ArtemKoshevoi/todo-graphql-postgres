import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from '../logger/logger.module';
import { UserTask } from '../user-task/models/user-task.entity';
import { UserTaskModule } from '../user-task/user-task.module';
import { Task } from './models/task.entity';
import { TasksMutationResolver } from './tasks.mutation.resolver';
import { TasksQueryResolver } from './tasks.query.resolver';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, UserTask]),
    LoggerModule,
    UserTaskModule,
  ],
  providers: [
    TasksResolver,
    TasksService,
    TasksMutationResolver,
    TasksQueryResolver,
  ],
})
export class TasksModule {}
