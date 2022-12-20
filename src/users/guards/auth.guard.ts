import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const reqData = context.switchToHttp().getRequest();
    console.log('from Guard', reqData.query);

    // condition to be checked here

    return true;
  }
}
