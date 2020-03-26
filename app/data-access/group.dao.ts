import { v1 as uuid } from 'uuid';

import { IGroup, GroupModel } from '../models/group.model';
import { UserGroupModel } from '../models/user-group.model';
import { sequelize } from '..';

export class GroupDAO {
  public static async getAllGroups(): Promise<GroupModel[]> {
    return GroupModel.findAll<GroupModel>({
      attributes: { exclude: ['password'] }
    });
  }

  public static async getGroupById(id: string): Promise<GroupModel | null> {
    return GroupModel.findOne({
      where: {
        id
      },
      attributes: { exclude: ['password'] }
    });
  }

  public static async addGroup(group: IGroup): Promise<GroupModel> {
    return GroupModel.create({ ...group, id: uuid() });
  }

  public static async updateGroup(
    updatedGroup: GroupModel,
    id: string
  ): Promise<GroupModel> {
    const { name, permissions } = updatedGroup;
    return GroupModel.update(
      {
        name,
        permissions
      },
      {
        where: {
          id
        },
        returning: true
      }
    ).then(([, [group]]: [number, GroupModel[]]) => group);
  }

  public static async deleteGroup(id: string): Promise<number> {
    return sequelize.transaction(async () => {
      return Promise.all([
        GroupModel.destroy({
          where: {
            id
          }
        }),
        UserGroupModel.destroy({
          where: {
            groupId: id
          }
        })
      ]).then(([numberOfGroups]: [number, number]) => numberOfGroups);
    });
  }
}
