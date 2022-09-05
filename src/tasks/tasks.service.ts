import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyLogger } from 'src/logger/my-logger.service';
import { Repository } from 'typeorm';
import { CreateTaskInput } from './inputs/create-task.input';
import { UpdateTaskStatusInput } from './inputs/update-task-status';
import { UpdateTaskTitleInput } from './inputs/update-task-title';
import { Task } from './models/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private myLogger: MyLogger,
  ) {
    this.myLogger.setContext('TasksService');
  }

  async createTask(input: CreateTaskInput): Promise<Task> {
    const task = this.taskRepository.create(input);
    return await this.taskRepository.save(task);
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

  async updateTaskStatus(input: UpdateTaskStatusInput): Promise<Task> {
    const { id, status } = input;
    await this.taskRepository.update(id, { status: status });

    return this.getTask(id);
  }

  async updateTaskTitle(input: UpdateTaskTitleInput): Promise<Task> {
    const { id, title } = input;

    await this.taskRepository.update(id, { title: title });

    return this.getTask(id);
  }
}
