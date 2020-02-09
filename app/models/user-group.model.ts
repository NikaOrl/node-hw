import {
  Table,
  Column,
  Model,
  Unique,
  PrimaryKey,
  DataType
} from 'sequelize-typescript';
import Joi from '@hapi/joi';
import { NextFunction, Response, Request } from 'express';

export interface IUserGroup {
  id: string;
  userId: string;
  groupId: string;
}

@Table({ tableName: 'usergroup' })
export class UserGroupModel extends Model<UserGroupModel> {
  @PrimaryKey
  @Unique
  @Column(DataType.STRING)
  id: string | undefined;

  @Column(DataType.STRING)
  userId: string | undefined;

  @Column(DataType.STRING)
  groupId: string | undefined;
}

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
