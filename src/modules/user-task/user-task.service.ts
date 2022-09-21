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

  async assingTaskToUser(userId: string, taskId: number) {
    return this.userTaskRepository.save(
      this.userTaskRepository.create({ userId, taskId }),
    );
  }

  async unAssignTask(input: UnAssignTaskInput) {
    const { taskId, userId } = input;

    const userTask = await this.userTaskRepository.findOneBy({
      userId,
      taskId,
    });

    await this.userTaskRepository.delete(userTask.id);

    return userTask; //TODO: check how to return nothing
  }
}
