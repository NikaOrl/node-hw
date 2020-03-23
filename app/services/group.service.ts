import { GroupDAO } from '../data-access/group.dao';
import { GroupModel, IGroup } from '../models/group.model';
import { UserGroupDAO } from '../data-access/usergroup.dao';
import { UserGroupModel } from '../models/user-group.model';

export class GroupService {
  public static async getAllGroups(): Promise<GroupModel[]> {
    return await GroupDAO.getAllGroups();
  }

  public static async getGroupById(id: string): Promise<GroupModel | null> {
    return await GroupDAO.getGroupById(id);
  }

  public static async addGroup(Group: IGroup): Promise<GroupModel> {
    return await GroupDAO.addGroup({ ...Group });
  }

  public static async updateGroup(
    updatedGroup: GroupModel,
    id: string
  ): Promise<GroupModel> {
    return await GroupDAO.updateGroup(updatedGroup, id);
  }

  public static async deleteGroup(id: string): Promise<number> {
    return await GroupDAO.deleteGroup(id);
  }

  public static async addUsersToGroup(
    groupId: string,
    userIds: string[]
  ): Promise<UserGroupModel[] | Error> {
    return await UserGroupDAO.addUsersToGroup(groupId, userIds);
  }
}
