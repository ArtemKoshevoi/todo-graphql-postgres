import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { MyLogger } from '../logger/my-logger.service';
import { UserRole } from '../shared/enums/user-role.enum';
import { UserTaskService } from '../user-task/user-task.service';
import { AssignTaskInput } from './dto/assign-task.input';
import { CreateTaskInput } from './dto/create-task.input';
import { UnAssignTaskInput } from './dto/un-assign-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './models/task.model';
import { User } from '../users/models/user.model';

@Injectable()
export class TasksService {
  constructor(
    private myLogger: MyLogger,
    // private readonly userTaskService: UserTaskService,
    @InjectModel('Tasks')
    private readonly tasksModel: Model<Task>,
  ) {
    this.myLogger.setContext('TasksService');
  }

  // async createTask(input: CreateTaskInput, user: User) {
  //   const task = await this.tasksModel.findOne({ title: input.title });
  //   if (task) {
  //     throw new Error('Task already exists');
  //   }
  //   const newTask = new this.tasksModel({ title: input.title });
  //   const createdTask = await newTask.save();
  //   if (user?.roles?.includes(UserRole.User)) {
  //     this.userTaskService.assingTaskToUser(user._id, newTask.id);
  //   }
  //   return createdTask.id as string;
  // }

  // async getTask(id: string): Promise<Task> {
  //   const task = await this.tasksModel.findById(id);

  //   if (!task) {
  //     throw new NotFoundException(`Task #${id} not found`);
  //   }
  //   return task;
  // }

  // async getAll(): Promise<Task[]> {
  //   this.myLogger.warn('Please be careful with this task!');
  //   this.myLogger.customLog();

  //   return await this.tasksModel.find();
  // }

  // async removeTask(id: number): Promise<void> {
  //   await this.tasksModel.deleteOne({ _id: id });
  // }

  // async updateTask(input: UpdateTaskInput): Promise<Task> {
  //   const { id, title } = input;

  //   this.tasksModel.updateOne({ id: id }, { title: title });

  //   return this.getTask(id);
  // }

  // assignTask(input: AssignTaskInput): Promise<UserTask> {
  //   const { userId, taskId } = input;

  //   return this.userTaskService.assingTaskToUser(userId, taskId);
  // }

  // unAssignTask(input: UnAssignTaskInput): boolean {
  //   this.userTaskService.unAssignTask(input);
  //   return true;
  // }

  // getUserTasksByUserId(userId: string): Promise<Task[]> {
  //   return this.tasksModel
  //     .createQueryBuilder('task')
  //     .leftJoinAndSelect(UserTask, 'userTask', 'task.id=userTask.taskId')
  //     .where('userTask.userId = :userId', { userId })
  //     .getMany();
  // }
}
