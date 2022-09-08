import { NestMiddleware } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { NextFunction } from 'express';
import { AuthService } from 'src/modules/auth/auth.service';
import { User } from 'src/modules/users/models/user.entity';
import { UsersService } from 'src/modules/users/users.service';

export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}
  async use(
    req: Request & { headers: { authorization: string }; user: User },
    res: Response,
    next: NextFunction,
  ) {
    const token = this.authService.getToken(req.headers.authorization);

    if (!token) {
      return next();
    }

    const isVerified = await this.authService.verifyToken(token);
    if (!isVerified) {
      return next();
    }

    const user = await this.userService.findOne(token); // TODO: check BasicOrmService

    if (!user) {
      return next();
    }

    req.user = plainToClass(User, user);
    next();
  }
}
