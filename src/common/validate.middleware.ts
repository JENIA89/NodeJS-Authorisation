import { IMiddleware } from './middleware.interface';
import { NextFunction, Response, Request } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidateMiddleware implements IMiddleware {
  constructor(private classtoValidate: ClassConstructor<object>) {}

  execute({ body }: Request, res: Response, next: NextFunction): void {
    const instance = plainToClass(this.classtoValidate, body);
    validate(instance).then((err) => {
      if (err.length > 0) {
        res.status(422).send(err);
      } else {
        next();
      }
    });
  }
}
