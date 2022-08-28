import { ILogger } from './../logger/logger.interface';
import { IUsersController } from './users.controller.interface';
import { NextFunction, Response, Request } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { TYPES } from '../types';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import 'reflect-metadata';
import { IUsersService } from './users.service.interface';

@injectable()
export class UserController extends BaseController implements IUsersController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.UserService) private userService: IUsersService,
  ) {
    super(loggerService);
    this.bindRoutes([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login },
    ]);
  }

  async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.userService.create(body);
    if (!result) {
      return next(new HTTPError(422, 'User already exists'));
    }
    this.ok(res, result);
  }

  login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
    // this.ok(res, 'login');
    next(new HTTPError(401, 'not authorized', 'login'));
  }
}
