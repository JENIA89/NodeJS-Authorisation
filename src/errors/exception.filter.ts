import { NextFunction, Response, Request } from 'express';
import { LoggerService } from '../logger/logger.service';
import { IExceptionFilter } from './exception.filter.interface';

export class ExceptionFiler implements IExceptionFilter {
  logger: LoggerService;

  constructor(logger: LoggerService) {
    this.logger = logger;
  }

  catch(err: Error, req: Request, res: Response, next: NextFunction) {
    this.logger.error(`${err.message}`);
    res.status(500).send({ err: err.message });
  }
}
