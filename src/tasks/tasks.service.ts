import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskInput } from './inputs/create-task.input';
import { Task } from './models/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

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
      throw new NotFoundException(`User #${id} not found`);
    }
    return task;
  }

  async getAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }
}
