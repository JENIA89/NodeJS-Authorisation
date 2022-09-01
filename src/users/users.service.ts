import { inject, injectable } from 'inversify';
import { IConfigSevice } from '../config/config.service.interface';
import { TYPES } from '../types';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersService } from './users.service.interface';

@injectable()
export class UserService implements IUsersService {
  constructor(@inject(TYPES.ConfigService) private configService: IConfigSevice) {}

  async create({ email, name, password }: UserRegisterDto): Promise<User | null> {
    const user = new User(email, name);
    const salt = this.configService.get('SALT');
    await user.setPassword(password, Number(salt));
    return null;
  }

  validateUser: (dto: UserLoginDto) => Promise<boolean>;
}
