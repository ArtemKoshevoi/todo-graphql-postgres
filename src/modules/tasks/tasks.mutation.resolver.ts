import { Args, Int, Mutation, ResolveField, Resolver } from '@nestjs/graphql';
import { Roles } from '../shared/decorators/roles.decortors';
import { ActiveUser } from '../shared/decorators/user.decorator';
import { UserRole } from '../shared/enums/user-role.enum';
import { User } from '../users/models/user.entity';
import { AssignTaskInput } from './dto/assign-task.input';
import { CreateTaskInput } from './dto/create-task.input';
import { UnAssignTaskInput } from './dto/un-assign-task.input';
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
  createTask(@Args('input') input: CreateTaskInput, @ActiveUser() user: User) {
    return this.tasksService.createTask(input, user);
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

  @ResolveField()
  @Roles(UserRole.Admin)
  assignTask(@Args('input') input: AssignTaskInput) {
    return this.tasksService.assignTask(input);
  }

  @ResolveField()
  @Roles(UserRole.Admin)
  unAssignTask(@Args('input') input: UnAssignTaskInput) {
    return this.tasksService.unAssignTask(input);
  }
}
