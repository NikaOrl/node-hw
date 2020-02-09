import { v1 as uuid } from 'uuid';

import { IGroup, GroupModel } from '../models/group.model';

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
    ).then(([rowsUpdated, [group]]) => group);
  }

  public static async deleteGroup(id: string): Promise<number> {
    return GroupModel.destroy({
      where: {
        id
      }
    }).then(numberOfGroups => numberOfGroups);
  }
}
