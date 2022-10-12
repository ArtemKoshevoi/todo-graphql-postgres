import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTask } from '../user-task/models/user-task.entity';
import { User } from './models/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: {
        profile: true,
      },
    });
    return users;
  }

  findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { profile: { username: username } },
    });
  }

  findOneByToken(token: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ token });
  }

  getUsersAssignedToTask(taskId: string): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect(UserTask, 'userTask', 'user.id=userTask.userId')
      .where('userTask.taskId = :taskId', { taskId })
      .getMany();
  }
}
