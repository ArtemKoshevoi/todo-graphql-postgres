import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MyLogger } from '../logger/my-logger.service';
import { UserRole } from '../shared/enums/user-role.enum';
import { UserTask } from '../user-task/models/user-task.entity';
import { UserTaskService } from '../user-task/user-task.service';
import { User } from '../users/models/user.entity';
import { AssignTaskInput } from './dto/assign-task.input';
import { CreateTaskInput } from './dto/create-task.input';
import { UnAssignTaskInput } from './dto/un-assign-task.input';
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

  async createTask(input: CreateTaskInput, user: User) {
    const task = await this.taskRepository.findOneBy({ title: input.title });

    if (task) {
      throw new Error('Task already exists');
    }

    const newTask = await this.taskRepository.save(
      this.taskRepository.create(input),
    );

    if (user?.roles?.includes(UserRole.User)) {
      this.userTaskService.assingTaskToUser(user.id, newTask.id);
    }

    return newTask;
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

  async assignTask(input: AssignTaskInput): Promise<UserTask> {
    const { userId, taskId } = input;

    return await this.userTaskService.assingTaskToUser(userId, taskId);
  }

  async unAssignTask(input: UnAssignTaskInput): Promise<UserTask> {
    return await this.userTaskService.unAssignTask(input);
  }

  async getUserTasks(userId: string) {
    const userTasks = await this.userTaskService.getUserTasks(userId);
    const taskIds = userTasks.map((task) => task.taskId);

    return await this.taskRepository
      .createQueryBuilder('tasks')
      .where('tasks.id IN (:taskIds)', { taskIds: taskIds })
      .getMany();
  }
}
