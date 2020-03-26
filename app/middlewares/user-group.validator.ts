import Joi from '@hapi/joi';
import { NextFunction, Response, Request } from 'express';

import { IUserGroup } from '../models/user-group.model';

const schema: Joi.ObjectSchema<IUserGroup> = Joi.object({
  userIds: Joi.array()
    .items(Joi.string())
    .required()
});

const validate: (
  objectSchema: Joi.ObjectSchema<IUserGroup>
) => (
  req: Request<any>,
  res: Response,
  next: NextFunction
) => boolean | void = (objectSchema: Joi.ObjectSchema<IUserGroup>) => {
  return (req: Request, res: Response, next: NextFunction): boolean | void => {
    const { error } = objectSchema.validate(req.body);

    if (error && error.isJoi) {
      res.status(400).json(error.message);
      return false;
    }
    next();
  };
};

export const validateUserGroup: (
  req: Request<any>,
  res: Response,
  next: NextFunction
) => boolean | void = validate(schema);
