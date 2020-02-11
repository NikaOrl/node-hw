import { v1 as uuid } from 'uuid';

import { UserGroupModel, IUserGroup } from '../app/models/user-group.model';
import { sequelize } from '../app/config/config';

sequelize
  .authenticate()
  .then(() => {
    return UserGroupModel.sync({ force: true });
  })
  .then(() => {
    console.log('Connection established successfully.');
    Promise.all(
      usergroups.map(usergroupData => {
        const user = new UserGroupModel(usergroupData);
        return user.save();
      })
    ).then(() => {
      sequelize.close();
    });
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
    sequelize.close();
  });

const usergroups: IUserGroup[] = [
  {
    id: uuid(),
    userId: '02f85eb0-407e-11ea-b467-d7f6bf5cef68',
    groupId: 'ca2278d0-4b38-11ea-9d6c-e99a947f6918'
  },
  {
    id: uuid(),
    userId: '02f85eb1-407e-11ea-b467-d7f6bf5cef68',
    groupId: 'ca2278d0-4b38-11ea-9d6c-e99a947f6918'
  },
  {
    id: uuid(),
    userId: '02f85eb2-407e-11ea-b467-d7f6bf5cef68',
    groupId: 'ca2278d0-4b38-11ea-9d6c-e99a947f6918'
  },
  {
    id: uuid(),
    userId: '02f85eb0-407e-11ea-b467-d7f6bf5cef68',
    groupId: 'ca2278d1-4b38-11ea-9d6c-e99a947f6918'
  },
  {
    id: uuid(),
    userId: '02f85eb7-407e-11ea-b467-d7f6bf5cef68',
    groupId: 'ca2278d1-4b38-11ea-9d6c-e99a947f6918'
  },
  {
    id: uuid(),
    userId: '02f85eb9-407e-11ea-b467-d7f6bf5cef68',
    groupId: 'ca2278d1-4b38-11ea-9d6c-e99a947f6918'
  },
  {
    id: uuid(),
    userId: '02f85eb9-407e-11ea-b467-d7f6bf5cef68',
    groupId: 'ca2278d3-4b38-11ea-9d6c-e99a947f6918'
  },
  {
    id: uuid(),
    userId: '02f85eb9-407e-11ea-b467-d7f6bf5cef68',
    groupId: 'a2278d2-4b38-11ea-9d6c-e99a947f6918'
  }
];
