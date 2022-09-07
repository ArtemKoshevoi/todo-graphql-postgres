import { Args, Int, Mutation, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateTaskInput } from './dto/create-task.input';
// import { UpdateTaskStatusInput } from './dto/update-task-status';
// import { UpdateTaskTitleInput } from './dto/update-task-title';
import { UpdateTaskInput } from './dto/update-task.input';
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
  createTask(@Args('input') input: CreateTaskInput) {
    return this.tasksService.createTask(input);
  }

  @ResolveField()
  removeTask(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.removeTask(id);
  }

  @ResolveField()
  updateTask(@Args('input') input: UpdateTaskInput) {
    return this.tasksService.updateTask(input);
  }
}
