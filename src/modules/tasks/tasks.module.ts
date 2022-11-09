import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TasksMutationResolver } from './tasks.mutation.resolver';
import { TasksQueryResolver } from './tasks.query.resolver';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';
import { TasksSchema } from './schemas/tasks.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tasks', schema: TasksSchema }]),
  ],
  providers: [
    TasksResolver,
    TasksService,
    TasksMutationResolver,
    TasksQueryResolver,
  ],
})
export class TasksModule {}
