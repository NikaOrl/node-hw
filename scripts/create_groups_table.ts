import { GroupModel, IGroup, Permission } from '../app/models/group.model';
import { sequelize } from '../app/config/config';

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

sequelize
  .authenticate()
  .then(() => {
    return GroupModel.sync({ force: true });
  })
  .then(() => {
    console.log('Connection established successfully.');
    Promise.all(
      groups.map((groupData: IGroup) => {
        const group: GroupModel = new GroupModel(groupData);
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
