import { UserModel } from '@prisma/client';
import { IUsersRepository } from './users.repository.interface';
import { inject, injectable } from 'inversify';
import { IConfigSevice } from '../config/config.service.interface';
import { TYPES } from '../types';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersService } from './users.service.interface';

@injectable()
export class UserService implements IUsersService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigSevice,
    @inject(TYPES.UsersPerository) private usersRepository: IUsersRepository,
  ) {}

  async create({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
    const existedUser = await this.usersRepository.find(email);
    if (existedUser) return null;

    const user = new User(email, name);
    const salt = this.configService.get('SALT');
    await user.setPassword(password, Number(salt));

    return this.usersRepository.create(user);
  }

  async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
    const existedUser = await this.usersRepository.find(email);
    if (!existedUser) return false;

    const newUser = new User(existedUser.email, existedUser.name, existedUser.password);
    return newUser.comparePassword(password);
  }
}
