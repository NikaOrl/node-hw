import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { v1 as uuid } from 'uuid';

import { User, IUser } from './users.model';
import { CreateUserDto } from './users.controller';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') private readonly usersRepository: typeof User
  ) {}

  async getUserById(id: string): Promise<IUser> {
    return User.findByPk(id);
  }

  async createUser(data: CreateUserDto) {
    const user = new User({ ...data, id: uuid(), isDeleted: false });
    return user.save();
  }

  async updateUserById(id: string, data: CreateUserDto) {
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

  async getUsers(loginSubstr: string, limit: number): Promise<IUser[]> {
    let lookupValue = loginSubstr.toLowerCase();

    return this.usersRepository.findAll<User>({
      where: {
        login: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('login')),
          'LIKE',
          '%' + lookupValue + '%'
        )
      },
      limit
    });
  }

  async deleteUserById(id: string) {
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
}
