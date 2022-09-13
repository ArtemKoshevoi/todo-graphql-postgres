import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { User } from '../users/models/user.entity';
import { UsersService } from '../users/users.service';
import { SignUpResponse } from './dto/signup-response';
import { ConfigService } from '@nestjs/config';
import { UserSignUpInput } from './dto/user-signup.input';
import { UserLoginInput } from './dto/user-login.input';

@Injectable()
export class AuthService {
  private jwtSecretKey = this.configService.get('JWT_SECRET_KEY');

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(input: UserSignUpInput): Promise<SignUpResponse> {
    const user = await this.usersService.findOne(input.profile.userName);

    if (user) {
      throw new Error('User already exists');
    }

    const { profile, ...data } = input;

    const newUser = this.userRepository.create({
      ...data,
      profile: { username: profile.userName },
    });
    newUser.password = await bcrypt.hash(input.password, 10);

    const createdUser = await this.userRepository.save(newUser);
    const userProfile = await createdUser.profile;

    return {
      access_token: this.jwtService.sign({
        username: userProfile.username,
        sub: createdUser.id,
      }),
      user: createdUser,
    };
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

  async login(input: UserLoginInput) {
    const { username } = input;
    const user = await this.usersService.findOne(username);
    const profile = await user.profile;

    return {
      access_token: this.jwtService.sign({
        username: profile.username,
        sub: user.id,
      }),
      user,
    };
  }

  getToken(authHeader?: string) {
    if (!authHeader) {
      return;
    }

    const match = authHeader.match(/[Bb]earer (?<token>.*)/);

    if (!match) {
      return;
    }

    const { token } = match.groups;

    return token;
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, this.jwtSecretKey);
    } catch (e) {
      return null;
    }
  }
}
