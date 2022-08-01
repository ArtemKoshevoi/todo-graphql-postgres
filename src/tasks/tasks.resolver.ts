import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class TasksResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
