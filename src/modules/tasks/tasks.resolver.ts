import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskInput } from './inputs/create-task.input';
import { UpdateTaskStatusInput } from './inputs/update-task-status';
import { UpdateTaskTitleInput } from './inputs/update-task-title';
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

  @Mutation(() => Task, { nullable: true })
  removeTask(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.removeTask(id);
  }

  @Mutation(() => Task)
  updateTaskStatus(
    @Args('updateTaskStatusInput') updateTaskStatusInput: UpdateTaskStatusInput,
  ) {
    return this.tasksService.updateTaskStatus(updateTaskStatusInput);
  }

  @Mutation(() => Task)
  updateTaskTitle(
    @Args('updateTaskTitleInput') updateTaskTitleInput: UpdateTaskTitleInput,
  ) {
    return this.tasksService.updateTaskTitle(updateTaskTitleInput);
  }
}
