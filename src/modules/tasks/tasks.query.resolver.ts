import { Args, Int, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Roles } from '../shared/decorators/roles.decortors';
import { ActiveUser } from '../shared/decorators/user.decorator';
import { UserRole } from '../shared/enums/user-role.enum';
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
  @Roles(UserRole.Admin)
  findAll() {
    return this.tasksService.getAll();
  }

  @ResolveField()
  @Roles(UserRole.Admin)
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.tasksService.getTask(id);
  }

  @ResolveField()
  @Roles()
  getUserTasksByUserId(@ActiveUser() user: User) {
    return this.tasksService.getUserTasksByUserId(user.id);
  }
}
