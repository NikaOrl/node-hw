import {
  Table,
  Column,
  Model,
  Unique,
  PrimaryKey,
  Default,
  DataType
} from 'sequelize-typescript';

export interface IUser {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
  token: string | null;
}

export interface IUserSearch {
  loginSubstring: string;
  limit: number;
}

export interface ILoginData {
  login: string;
  password: string;
}

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel> {
  @PrimaryKey
  @Unique
  @Column(DataType.STRING)
  id: string | undefined;

  @Column(DataType.STRING)
  login: string | undefined;

  @Column(DataType.STRING)
  password: string | undefined;

  @Column(DataType.INTEGER)
  age: number | undefined;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isDeleted: boolean | undefined;

  @Default(null)
  @Column(DataType.STRING)
  token: string | undefined | null;
}
