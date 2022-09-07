import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from '../logger/logger.module';
import { Task } from './models/task.entity';
import { TasksMutationResolver } from './tasks.mutation.resolver';
import { TasksQueryResolver } from './tasks.query.resolver';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), LoggerModule],
  providers: [
    TasksResolver,
    TasksService,
    TasksMutationResolver,
    TasksQueryResolver,
  ],
})
export class TasksModule {}
