import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserSignUpInput } from '../users/dto/user-sign-up.input';
import { User } from '../users/models/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(input: UserSignUpInput): Promise<User> {
    const user = await this.usersService.findOne(input.username); // TODO: check uniqe user in database

    if (user) {
      throw new Error('User already exists');
    }

    const password = await bcrypt.hash(input.password, 10);

    const newUser = this.userRepository.create({ ...input, password });

    return await this.userRepository.save(newUser);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    const valid = await bcrypt.compare(pass, user?.password);

    if (user && valid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user,
    };
  }
}
