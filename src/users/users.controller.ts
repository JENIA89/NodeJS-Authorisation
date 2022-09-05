import { ValidateMiddleware } from './../common/validate.middleware';
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
import { sign } from 'jsonwebtoken';
import { IConfigSevice } from '../config/config.service.interface';
import { AuthGuard } from '../common/auth.guard';

@injectable()
export class UserController extends BaseController implements IUsersController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.UserService) private userService: IUsersService,
    @inject(TYPES.ConfigService) private configService: IConfigSevice,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/register',
        method: 'post',
        func: this.register,
        middlewares: [new ValidateMiddleware(UserRegisterDto)],
      },
      {
        path: '/login',
        method: 'post',
        func: this.login,
        middlewares: [new ValidateMiddleware(UserLoginDto)],
      },
      {
        path: '/info',
        method: 'get',
        func: this.info,
        middlewares: [new AuthGuard()],
      },
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

  async login(
    { body }: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.userService.validateUser(body);
    if (!result) {
      return next(new HTTPError(401, 'Authorisation Error'));
    }

    const jwt = await this.signJWT(body.email, this.configService.get('SECRET_KEY'));
    this.ok(res, { jwt });
  }

  async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
    this.ok(res, { email: user });
  }

  private signJWT(email: string, secret: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      sign(
        {
          email,
        },
        secret,
        {
          algorithm: 'HS256',
        },
        (err, token) => {
          if (err) reject(err);
          resolve(token as string);
        },
      );
    });
  }
}
