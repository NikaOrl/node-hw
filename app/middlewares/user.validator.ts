import Joi from '@hapi/joi';
import { NextFunction, Response, Request } from 'express';

import { IUser } from '../models/user.model';

const schema: Joi.ObjectSchema<IUser> = Joi.object({
  login: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{2,}$'))
    .required(),
  age: Joi.number()
    .integer()
    .min(4)
    .max(130)
    .required()
});

const validate: (
  objectSchema: Joi.ObjectSchema<IUser>
) => (
  req: Request<any>,
  res: Response,
  next: NextFunction
) => boolean | void = (objectSchema: Joi.ObjectSchema<IUser>) => {
  return (req: Request, res: Response, next: NextFunction): boolean | void => {
    const { error } = objectSchema.validate(req.body);

    if (error && error.isJoi) {
      res.status(400).json(error.message);
      return false;
    }
    next();
  };
};

export const validateUser: (
  req: Request<any>,
  res: Response,
  next: NextFunction
) => boolean | void = validate(schema);
