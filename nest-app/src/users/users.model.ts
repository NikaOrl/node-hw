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
}

@Table({ tableName: 'users' })
export class User extends Model<User> {
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
}
