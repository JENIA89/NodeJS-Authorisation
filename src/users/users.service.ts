import { injectable } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersService } from './users.service.interface';

@injectable()
export class UserService implements IUsersService {
  async create({ email, name, password }: UserRegisterDto): Promise<User | null> {
    const user = new User(email, name);
    await user.setPassword(password);
    return null;
  }

  validateUser: (dto: UserLoginDto) => Promise<boolean>;
}