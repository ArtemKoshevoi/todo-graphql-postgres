import { Args, Int, Mutation, ResolveField, Resolver } from '@nestjs/graphql';
import { Roles } from '../shared/decorators/roles.decortors';
import { CreateTaskInput } from './dto/create-task.input';
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
  @Roles()
  createTask(@Args('input') input: CreateTaskInput) {
    return this.tasksService.createTask(input);
  }

  @ResolveField()
  @Roles()
  removeTask(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.removeTask(id);
  }

  @ResolveField()
  @Roles()
  updateTask(@Args('input') input: UpdateTaskInput) {
    return this.tasksService.updateTask(input);
  }
}
