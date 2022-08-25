import { ILogger } from './../logger/logger.interface';
import { IUsersController } from './users.controller.interface';
import { NextFunction, Response, Request } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { TYPES } from '../types';
import 'reflect-metadata';

@injectable()
export class UserController extends BaseController implements IUsersController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login },
    ]);
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'register');
  }

  login(req: Request, res: Response, next: NextFunction) {
    // this.ok(res, 'login');
    next(new HTTPError(401, 'not authorized', 'login'));
  }
}
