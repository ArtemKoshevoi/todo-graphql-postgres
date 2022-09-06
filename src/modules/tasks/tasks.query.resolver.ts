import { Args, Int, Query, ResolveField, Resolver } from '@nestjs/graphql';
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
}
