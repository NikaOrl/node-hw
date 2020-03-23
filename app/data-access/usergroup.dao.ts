import { Transaction } from 'sequelize';
import { v1 as uuid } from 'uuid';

import { GroupModel } from '../models/group.model';
import { UserModel } from '../models/user.model';
import { UserGroupModel } from '../models/user-group.model';
import { sequelize } from '../config/config';

export class UserGroupDAO {
  public static async addUsersToGroup(
    groupId: string,
    userIds: string[]
  ): Promise<UserGroupModel[] | Error> {
    return sequelize.transaction(async (t: Transaction) => {
      const groupRecord: GroupModel | null = await GroupModel.findByPk(
        groupId,
        {
          transaction: t,
          raw: true
        }
      );
      const userRecords: UserModel[] = await UserModel.findAll({
        where: { id: userIds },
        transaction: t,
        raw: true
      });
      if (groupRecord) {
        return Promise.all(
          userRecords.map((user: UserModel) => {
            return UserGroupModel.create(
              { id: uuid(), userId: user.id, groupId: groupRecord.id },
              { transaction: t }
            );
          })
        );
      }
      return Error('Group was not found');
    });
  }
}
