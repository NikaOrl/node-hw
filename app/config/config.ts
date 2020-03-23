import { Sequelize } from 'sequelize-typescript';

import { UserModel } from '../models/user.model';
import { options } from '../../db.config';
import { GroupModel } from '../models/group.model';
import { UserGroupModel } from '../models/user-group.model';

export const sequelize: Sequelize = new Sequelize({
  dialect: 'postgres',
  host: options.connection.host,
  username: options.connection.user,
  database: options.connection.database,
  define: {
    timestamps: false
  }
});
sequelize.addModels([UserModel, GroupModel, UserGroupModel]);
