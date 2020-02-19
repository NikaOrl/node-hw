import Joi from '@hapi/joi';
import { NextFunction, Response, Request } from 'express';

import { IUserGroup } from '../models/user-group.model';

const schema: Joi.ObjectSchema<IUserGroup> = Joi.object({
  userId: Joi.string().required(),
  groupId: Joi.string().required()
});

const validate = (schema: Joi.ObjectSchema<IUserGroup>) => {
  return (req: Request, res: Response, next: NextFunction): boolean | void => {
    const { error } = schema.validate(req.body);

    if (error && error.isJoi) {
      res.status(400).json(error.message);
      return false;
    }
    next();
  };
};

export const validateUserGroup = validate(schema);
