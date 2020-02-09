import { options } from './db.config';
import { v1 as uuid } from 'uuid';

import { Sequelize } from 'sequelize-typescript';
import { GroupModel, IGroup, Permission } from './app/models/group.model';

const sequelize = new Sequelize({
  host: options.connection.host,
  database: options.connection.database,
  username: options.connection.user,
  dialect: 'postgres',
  models: [GroupModel],
  define: {
    timestamps: false
  }
});

sequelize
  .authenticate()
  .then(() => {
    return GroupModel.sync({ force: true });
  })
  .then(() => {
    console.log('Connection established successfully.');
    Promise.all(
      groups.map(groupData => {
        const group = new GroupModel(groupData);
        return group.save();
      })
    ).then(() => {
      sequelize.close();
    });
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
    sequelize.close();
  });

const groups: IGroup[] = [
  {
    id: uuid(),
    name: 'group1',
    permissions: [Permission.Read]
  },
  {
    id: uuid(),
    name: 'group2',
    permissions: [Permission.Write, Permission.Delete]
  },
  {
    id: uuid(),
    name: 'group3',
    permissions: [Permission.Read, Permission.Share]
  },
  {
    id: uuid(),
    name: 'group4',
    permissions: [Permission.Write, Permission.UploadFiles, Permission.Delete]
  }
];
