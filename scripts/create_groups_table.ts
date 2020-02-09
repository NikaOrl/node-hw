import { options } from '../db.config';

import { Sequelize } from 'sequelize-typescript';
import { GroupModel, IGroup, Permission } from '../app/models/group.model';

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
    id: 'ca2278d0-4b38-11ea-9d6c-e99a947f6918',
    name: 'group1',
    permissions: [Permission.Read]
  },
  {
    id: 'ca2278d1-4b38-11ea-9d6c-e99a947f6918',
    name: 'group2',
    permissions: [Permission.Write, Permission.Delete]
  },
  {
    id: 'ca2278d3-4b38-11ea-9d6c-e99a947f6918',
    name: 'group3',
    permissions: [Permission.Read, Permission.Share]
  },
  {
    id: 'ca2278d2-4b38-11ea-9d6c-e99a947f6918',
    name: 'group4',
    permissions: [Permission.Write, Permission.UploadFiles, Permission.Delete]
  }
];
