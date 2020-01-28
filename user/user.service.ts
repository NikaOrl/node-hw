import { Service } from 'typedi';

import { User, IUser } from './user.model';
import { Op } from 'sequelize/types';

@Service()
export class UserService {
  createUser(data: IUser) {
    const user = new User(data);
    return user.save();
  }

  getUsersList(loginSubstr: string, limit: number) {
    return User.findAll({
      where: {
        login: { [Op.iLike]: `%${loginSubstr}%` }
      },
      limit
    });
  }

  getUserById(id: number) {
    return User.findByPk(id);
  }

  deleteUserById(id: number) {
    return User.update(
      {
        isDeleted: true
      },
      {
        where: {
          id,
          isDeleted: false
        }
      }
    );
  }

  updateUserById(id: number, data: IUser) {
    const { login, password, age } = data;
    return User.update(
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
    );
  }
}
