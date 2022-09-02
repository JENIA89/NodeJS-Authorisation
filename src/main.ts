import { IUsersRepository } from './users/users.repository.interface';
import { IConfigSevice } from './config/config.service.interface';
import { ILogger } from './logger/logger.interface';
import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ExceptionFilter } from './errors/exception.filter';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { IBootstrapReturn, TYPES } from './types';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { UserService } from './users/users.service';
import { IUsersService } from './users/users.service.interface';
import { IUsersController } from './users/users.controller.interface';
import { ConfigService } from './config/config.service';
import { PrismaService } from './database/prisma.service';
import { UsersPerository } from './users/users.repository';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  bind<IUsersController>(TYPES.UserController).to(UserController);
  bind<IUsersService>(TYPES.UserService).to(UserService);
  bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
  bind<IConfigSevice>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  bind<IUsersRepository>(TYPES.UsersPerository).to(UsersPerository).inSingletonScope();
  bind<App>(TYPES.Application).to(App);
});

const bootstrap = (): IBootstrapReturn => {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { app, appContainer };
};

export const { app, appContainer } = bootstrap();
