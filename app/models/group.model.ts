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

export enum Permission {
  Read = 'READ',
  Write = 'WRITE',
  Delete = 'DELETE',
  Share = 'SHARE',
  UploadFiles = 'UPLOAD_FILES'
}

export interface IGroup {
  id: string;
  name: string;
  permissions: Array<Permission>;
}

@Table({ tableName: 'groups' })
export class GroupModel extends Model<GroupModel> {
  @PrimaryKey
  @Unique
  @Column(DataType.STRING)
  id: string | undefined;

  @Column(DataType.STRING)
  name: string | undefined;

  @Column(DataType.ARRAY(DataType.STRING))
  permissions: Array<Permission> | undefined;
}

const schema: Joi.ObjectSchema<IGroup> = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array().required()
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
