import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { UsersService } from '../users/users.service';
import { SignUpResponse } from './dto/signup-response';
import { ConfigService } from '@nestjs/config';
import { UserSignUpInput } from './dto/user-signup.input';
import { UserLoginInput } from './dto/user-login.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDoc } from '../users/models/user.model';

@Injectable()
export class AuthService {
  private jwtSecretKey = this.configService.get('JWT_SECRET_KEY');

  constructor(
    @InjectModel('Users')
    private readonly usersModel: Model<UserDoc>,
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

    const createdUser = new this.usersModel({
      ...data,
      profile: { username: profile.userName },
    });
    // return createdUser.save();

    // const newUser = this.userRepository.create({
    //   ...data,
    //   profile: { username: profile.userName },
    // });
    createdUser.password = await bcrypt.hash(input.password, 10);

    // const createdUser = await this.usersModel.save(newUser);
    const userProfile = await createdUser.profile;

    const accessToken = this.jwtService.sign({
      username: userProfile.username,
      sub: createdUser.id,
    });

    // await this.userRepository.save(
    //   this.userRepository.merge(createdUser, { token: accessToken }),
    // );

    return {
      access_token: accessToken,
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

    const accessToken = this.jwtService.sign({
      username: profile.username,
      sub: user._id,
    });

    // await this.userRepository.save(
    //   this.userRepository.merge(user, { token: accessToken }),
    // );

    // return {
    //   access_token: accessToken,
    //   user,
    // };
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
