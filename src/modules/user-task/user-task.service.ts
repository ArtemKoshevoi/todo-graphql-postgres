import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnAssignTaskInput } from '../tasks/dto/un-assign-task.input';
import { UserTask } from './models/user-task.entity';

@Injectable()
export class UserTaskService {
  constructor(
    @InjectRepository(UserTask)
    private readonly userTaskRepository: Repository<UserTask>,
  ) {}

  async getUserTask(userId: string, taskId: number) {
    return await this.userTaskRepository.findOneBy({
      userId,
      taskId,
    });
  }

  async getUserTasks(userId: string) {
    return await this.userTaskRepository.findBy({
      userId,
    });
  }

  async assingTaskToUser(userId: string, taskId: number) {
    const userTask = await this.getUserTask(userId, taskId);

    if (userTask) {
      throw new Error('User task already exists');
    }

    return this.userTaskRepository.save(
      this.userTaskRepository.create({ userId, taskId }),
    );
  }

  async unAssignTask(input: UnAssignTaskInput) {
    const { taskId, userId } = input;

    const userTask = await this.getUserTask(userId, taskId);

    await this.userTaskRepository.delete(userTask.id);
  }
}
