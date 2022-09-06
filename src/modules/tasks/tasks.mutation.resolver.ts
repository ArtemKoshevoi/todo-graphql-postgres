import { Args, Int, Mutation, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskStatusInput } from './dto/update-task-status';
import { UpdateTaskTitleInput } from './dto/update-task-title';
import { TasksMutation } from './models/tasks.mutation.model';
import { TasksService } from './tasks.service';

@Resolver(() => TasksMutation)
export class TasksMutationResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => TasksMutation)
  async tasks() {
    return {};
  }

  @ResolveField()
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.tasksService.createTask(createTaskInput);
  }

  @ResolveField()
  removeTask(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.removeTask(id);
  }

  @ResolveField()
  updateTaskStatus(
    @Args('updateTaskStatusInput') updateTaskStatusInput: UpdateTaskStatusInput,
  ) {
    return this.tasksService.updateTaskStatus(updateTaskStatusInput);
  }

  @ResolveField()
  updateTaskTitle(
    @Args('updateTaskTitleInput') updateTaskTitleInput: UpdateTaskTitleInput,
  ) {
    return this.tasksService.updateTaskTitle(updateTaskTitleInput);
  }
}
