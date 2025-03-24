import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

import { Role } from '../../models/roles.model';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { PayloadToken } from 'src/auth/models/token.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler()); // llega un array con los roles ['admin']
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest(); // obtenemos que rol tiene el user
    const user = request.user as PayloadToken;
    // {role: 'admin', sub: 1234}
    const isAuth = roles.some((role) => role === user.role); // ['admin'].some('admin' === 'admin')
    if (!isAuth) {
      throw new UnauthorizedException('your role is wrong');
    }
    return isAuth;
  }
}
