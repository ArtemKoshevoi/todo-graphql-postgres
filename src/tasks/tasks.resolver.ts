import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskInput } from './inputs/create-task.input';
import { Task } from './models/task.entity';
import { TasksService } from './tasks.service';

@Resolver()
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.tasksService.createTask(createTaskInput);
  }

  @Query(() => [Task], { name: 'tasks' })
  findAll() {
    return this.tasksService.getAll();
  }

  @Query(() => Task, { name: 'task' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.getTask(id);
  }
}
