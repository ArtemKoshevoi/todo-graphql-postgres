import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { intersection as _intersection } from 'lodash';

@Injectable()
export class RolesGuard implements CanActivate {
  isGlobal = false;

  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    let req;

    if (!ctx.getInfo()) {
      // rest
      req = context.switchToHttp().getRequest();
    } else {
      // graphql
      const cont = ctx.getContext();
      req = cont.req;
    }

    const handler = context.getHandler();

    const roles = this.reflector.get<string[]>('roles', handler);
    const skipGlobalGuard = this.reflector.get<string[]>(
      'skipGlobalGuard',
      handler,
    );

    // console.log(111, req.user);
    // console.log(222, roles);

    const user = req.user;

    if (roles && !user) {
      throw new UnauthorizedException();
    }

    if (
      !roles ||
      (!roles.length && user) ||
      (skipGlobalGuard && this.isGlobal)
    ) {
      return true;
    }

    if (roles.length && user) {
      // check that the current user role matches the role in the `Roles` decorator
      const hasPermission = () => !!_intersection(roles, user.roles).length;

      // check if user roles have changed since token generation
      const hasRole = () => user.roles.some((role) => roles.includes(role));

      return user.roles && hasRole() && hasPermission();
    }

    return false;
  }
}
