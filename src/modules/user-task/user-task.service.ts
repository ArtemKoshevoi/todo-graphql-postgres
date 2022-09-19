import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskStatus } from '../shared/enums/task-status.enum';
import { UserTask } from './models/user-task.entity';

@Injectable()
export class UserTaskService {
  constructor(
    @InjectRepository(UserTask)
    private readonly taskRepository: Repository<UserTask>,
  ) {}

  async assingTaskToUser(
    userId: string,
    taskId: number,
    taskStatus?: TaskStatus,
  ) {
    console.log(111, userId);
    console.log(222, taskId);
    console.log(333, taskStatus);

    this.taskRepository.save(
      this.taskRepository.create({ userId, taskId, taskStatus }),
    );
  }
}
