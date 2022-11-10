import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserTask } from './models/user-task.entity';
import { UserTaskService } from './user-task.service';

@Module({
  // imports: [TypeOrmModule.forFeature([UserTask])],
  imports: [],
  providers: [UserTaskService],
  exports: [UserTaskService],
})
export class UserTaskModule {}
