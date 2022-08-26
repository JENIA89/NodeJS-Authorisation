import { NextFunction, Response, Request } from 'express';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';

export interface IUsersService {
  create: (dto: UserRegisterDto) => User | null;
  validateUser: (dto: UserLoginDto) => boolean;
}
