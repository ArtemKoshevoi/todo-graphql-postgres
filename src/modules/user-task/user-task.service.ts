import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskStatus } from '../shared/enums/task-status.enum';
import { UserTask } from './models/user-task.entity';

@Injectable()
export class UserTaskService {
  constructor(
    @InjectRepository(UserTask)
    private readonly userTaskRepository: Repository<UserTask>,
  ) {}

  async assingTaskToUser(
    userId: string,
    taskId: number,
    taskStatus?: TaskStatus,
  ) {
    return this.userTaskRepository.save(
      this.userTaskRepository.create({ userId, taskId, taskStatus }),
    );
  }
}
