import { GroupDAO } from '../data-access/group.dao';
import { GroupModel, IGroup } from '../models/group.model';
import { UserGroupDAO } from '../data-access/usergroup.dao';

export class GroupService {
  public static async getAllGroups(): Promise<GroupModel[]> {
    return await GroupDAO.getAllGroups();
  }

  public static async getGroupById(id: string): Promise<GroupModel | null> {
    return await GroupDAO.getGroupById(id);
  }

  public static async addGroup(Group: IGroup) {
    return await GroupDAO.addGroup({ ...Group });
  }

  public static async updateGroup(updatedGroup: GroupModel, id: string) {
    return await GroupDAO.updateGroup(updatedGroup, id);
  }

  public static async deleteGroup(id: string) {
    return await GroupDAO.deleteGroup(id);
  }

  public static async addUsersToGroup(groupId: string, userIds: string[]) {
    return await UserGroupDAO.addUsersToGroup(groupId, userIds);
  }
}
