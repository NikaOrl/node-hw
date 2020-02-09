import { Sequelize } from 'sequelize-typescript';
import { v1 as uuid } from 'uuid';

import { IUser, UserModel } from '../models/user.model';

export class UserDAO {
  public static async getAllUsers(
    loginSubstring: string,
    limit: number
  ): Promise<UserModel[]> {
    return UserModel.findAll<UserModel>({
      where: {
        isDeleted: false,
        login: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('login')),
          'LIKE',
          '%' + loginSubstring + '%'
        )
      },
      attributes: { exclude: ['password'] },
      limit
    });
  }

  public static async getUserById(id: string): Promise<UserModel | null> {
    return UserModel.findOne({
      where: {
        id,
        isDeleted: false
      },
      attributes: { exclude: ['password'] }
    });
  }

  public static async addUser(user: IUser): Promise<UserModel> {
    return UserModel.create({ ...user, id: uuid(), isDeleted: false });
  }

  public static async updateUser(
    updatedUser: UserModel,
    id: string
  ): Promise<UserModel> {
    const { login, password, age } = updatedUser;
    return UserModel.update(
      {
        login,
        password,
        age
      },
      {
        where: {
          id,
          isDeleted: false
        },
        returning: true
      }
    ).then(([rowsUpdated, [user]]) => user);
  }

  public static async deleteUser(id: string): Promise<UserModel | null> {
    return UserModel.update(
      {
        isDeleted: true
      },
      {
        where: {
          id,
          isDeleted: false
        },
        returning: true
      }
    ).then(([rowsUpdated, [user]]) => user);
  }
}
