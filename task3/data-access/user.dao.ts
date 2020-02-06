import { IUser, UserModel } from '../models/user.model';
import { Sequelize } from 'sequelize/types';

export class UserDAO {
  public static async getAllUsers(
    loginSubstring: string,
    limit: number
  ): Promise<UserModel[]> {
    return UserModel.findAll({
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
    return UserModel.create({ ...user });
  }

  public static async updateUser(
    updatedUser: UserModel,
    id: string
  ): Promise<[number, UserModel[]]> {
    return UserModel.update(
      { ...updatedUser },
      { where: { id, isDeleted: false } }
    );
  }

  public static async deleteUser(id: string): Promise<[number, UserModel[]]> {
    const user = UserModel.findOne({
      where: {
        id,
        isDeleted: false
      }
    });
    return UserModel.update({ ...user, isDeleted: true }, { where: { id } });
  }
}
