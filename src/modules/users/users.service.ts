import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { UserTask } from '../user-task/models/user-task.entity';
import { User, UserDoc } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users')
    private readonly usersModel: Model<UserDoc>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersModel.find({});

    return users;
  }

  findOne(username: string): Promise<User | undefined> {
    // return this.usersModel.findOne({
    //   where: { profile: { username: username } },
    // });
    return undefined;
  }

  findOneByToken(token: string): Promise<User | undefined> {
    // return this.usersModel.find({ token }).exec();
    return undefined;
  }

  // getUsersAssignedToTask(taskId: string): Promise<User[]> {
  //   return this.usersModel
  //     .createQueryBuilder('user')
  //     .leftJoinAndSelect(UserTask, 'userTask', 'user.id=userTask.userId')
  //     .where('userTask.taskId = :taskId', { taskId })
  //     .getMany();
  // }
}
