import { Args, Int, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Roles } from '../shared/decorators/roles.decortors';
import { ActiveUser } from '../shared/decorators/user.decorator';
import { User } from '../users/models/user.entity';
import { TasksQuery } from './models/tasks.query.model';
import { TasksService } from './tasks.service';

@Resolver(() => TasksQuery)
export class TasksQueryResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query(() => TasksQuery)
  async tasks() {
    return {};
  }

  @ResolveField()
  findAll() {
    return this.tasksService.getAll();
  }

  @ResolveField()
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.getTask(id);
  }

  @ResolveField()
  @Roles()
  getUserTasks(@ActiveUser() user: User) {
    return this.tasksService.getUserTasks(user.id);
  }
}
