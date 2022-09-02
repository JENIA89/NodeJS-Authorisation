import { Container } from 'inversify';
import { App } from './app';

export const TYPES = {
  Application: Symbol.for('Application'),
  ILogger: Symbol.for('ILogger'),
  UserController: Symbol.for('UserController'),
  UserService: Symbol.for('UserService'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
  ConfigService: Symbol.for('ConfigService'),
  PrismaService: Symbol.for('PrismaService'),
  UsersPerository: Symbol.for('UsersPerository'),
};

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}
