import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MyLogger } from '../logger/my-logger.service';
import { UserRole } from '../shared/enums/user-role.enum';
import { UserTaskService } from '../user-task/user-task.service';
import { User } from '../users/models/user.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './models/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private myLogger: MyLogger,
    private readonly userTaskService: UserTaskService,
  ) {
    this.myLogger.setContext('TasksService');
  }

  async createTask(input: CreateTaskInput, user: User): Promise<Task> {
    if (user?.roles?.includes(UserRole.User)) {
      const task = await this.taskRepository.save(
        this.taskRepository.create(input),
      );
      this.userTaskService.assingTaskToUser(user.id, task.id);

      return task;
    }
  }

  async getTask(id: number): Promise<Task> {
    const task = await this.taskRepository
      .createQueryBuilder('task')
      .where('task.id = :taskId', { taskId: id })
      .getOne();

    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }
    return task;
  }

  async getAll(): Promise<Task[]> {
    this.myLogger.warn('Please be careful with this task!');
    this.myLogger.customLog();

    return await this.taskRepository.find();
  }

  async removeTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async updateTask(input: UpdateTaskInput): Promise<Task> {
    const { id, title } = input;

    await this.taskRepository.update(id, { title: title });

    return this.getTask(id);
  }
}