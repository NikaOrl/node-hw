import { options } from '../db.config';

import { Sequelize } from 'sequelize-typescript';
import { User } from '../nest-app/src/users/users.model';
import { IUser } from '../nest-app/dist/users/users.model';

const sequelize = new Sequelize({
  host: options.connection.host,
  database: options.connection.database,
  username: options.connection.user,
  dialect: 'postgres',
  models: [User],
  define: {
    timestamps: false
  }
});

sequelize
  .authenticate()
  .then(() => {
    return User.sync({ force: true });
  })
  .then(() => {
    console.log('Connection established successfully.');
    Promise.all(
      users.map(userData => {
        const user = new User(userData);
        return user.save();
      })
    ).then(() => {
      sequelize.close();
    });
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
    sequelize.close();
  });

const users: IUser[] = [
  {
    id: '2f85eb0-407e-11ea-b467-d7f6bf5cef68',
    login: 'ivan@stud.com',
    password: 'password',
    age: 20,
    isDeleted: false
  },
  {
    id: '02f85eb1-407e-11ea-b467-d7f6bf5cef68',
    login: 'petr@stud.com',
    password: 'password',
    age: 20,
    isDeleted: false
  },
  {
    id: '2f85eb2-407e-11ea-b467-d7f6bf5cef68',
    login: 'vasia@stud.com',
    password: 'password',
    age: 20,
    isDeleted: false
  },
  {
    id: '02f85eb3-407e-11ea-b467-d7f6bf5cef68',
    login: 'serg@stud.com',
    password: 'password',
    age: 20,
    isDeleted: false
  },
  {
    id: '02f85eb4-407e-11ea-b467-d7f6bf5cef68',
    login: 'tolya@stud.com',
    password: 'password',
    age: 20,
    isDeleted: false
  },
  {
    id: '2f85eb5-407e-11ea-b467-d7f6bf5cef68',
    login: 'andrei@stud.com',
    password: 'password',
    age: 20,
    isDeleted: false
  },
  {
    id: '02f85eb6-407e-11ea-b467-d7f6bf5cef68',
    login: 'sachar@stud.com',
    password: 'password',
    age: 20,
    isDeleted: false
  },
  {
    id: '02f85eb7-407e-11ea-b467-d7f6bf5cef68',
    login: 'kostya@stud.com',
    password: 'password',
    age: 20,
    isDeleted: false
  },
  {
    id: '02f85eb8-407e-11ea-b467-d7f6bf5cef68',
    login: 'kolya@stud.com',
    password: 'password',
    age: 20,
    isDeleted: false
  },
  {
    id: '02f85eb9-407e-11ea-b467-d7f6bf5cef68',
    login: 'anton@stud.com',
    password: 'password',
    age: 20,
    isDeleted: false
  }
];
