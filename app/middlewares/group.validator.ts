import Joi from '@hapi/joi';
import { NextFunction, Response, Request } from 'express';

import { Permission, IGroup } from '../models/group.model';

export const ALLOWED_PERMISSIONS: Permission[] = [
  Permission.Read,
  Permission.Write,
  Permission.Delete,
  Permission.Share,
  Permission.UploadFiles
];

const schema: Joi.ObjectSchema<IGroup> = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array()
    .items(...ALLOWED_PERMISSIONS)
    .required()
});

const validate = (schema: Joi.ObjectSchema<IGroup>) => {
  return (req: Request, res: Response, next: NextFunction): boolean | void => {
    const { error } = schema.validate(req.body);

    if (error && error.isJoi) {
      res.status(400).json(error.message);
      return false;
    }
    next();
  };
};

export const validateGroup = validate(schema);
