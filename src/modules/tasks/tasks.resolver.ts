import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Roles } from '../shared/decorators/roles.decortors';
import { UserRole } from '../shared/enums/user-role.enum';
import { UsersService } from '../users/users.service';
import { Task } from './models/task.entity';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly userService: UsersService) {}

  @ResolveField()
  @Roles(UserRole.Admin)
  assignedTo(@Parent() task: Task) {
    return this.userService.getUsersAssignedToTask(task.id);
  }
}
