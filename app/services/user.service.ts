import { IUser, UserModel } from '../models/user.model';
import { UserDAO } from '../data-access/user.dao';
import * as jwt from 'jsonwebtoken';

export class UserService {
  public static async getAllUsers(
    loginSubstring: string,
    limit: number
  ): Promise<UserModel[]> {
    return await UserDAO.getAllUsers(loginSubstring, limit);
  }

  public static async getUserById(id: string): Promise<UserModel | null> {
    return await UserDAO.getUserById(id);
  }

  public static async addUser(user: IUser): Promise<UserModel> {
    return await UserDAO.addUser({ ...user });
  }

  public static async updateUser(
    updatedUser: UserModel,
    id: string
  ): Promise<UserModel> {
    return await UserDAO.updateUser(updatedUser, id);
  }

  public static async deleteUser(id: string): Promise<UserModel | null> {
    return await UserDAO.deleteUser(id);
  }

  public static async login(login: string, password: string): Promise<string> {
    const userRecord: UserModel | null = await UserDAO.findByLogin(login);
    if (userRecord && userRecord.password === password) {
      const token: string = jwt.sign(
        { login, password },
        process.env.SECRET_KEY as string,
        {
          expiresIn: 60 * 60
        }
      );
      const user: UserModel = await UserDAO.updateUser(
        { ...userRecord, token } as UserModel,
        userRecord.id as string
      );
      if (!user) return user;
      return token;
    }
    throw Error('There is no user with such pair of login and password');
  }
}
