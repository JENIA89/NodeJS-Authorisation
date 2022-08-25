import { Container } from 'inversify';
import { App } from './app';

export const TYPES = {
  Application: Symbol.for('Application'),
  ILogger: Symbol.for('ILogger'),
  UserController: Symbol.for('UserController'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
};

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}
