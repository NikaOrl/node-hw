import { options } from './db.config';
import { v1 as uuid } from 'uuid';

import { Sequelize } from 'sequelize-typescript';
import { User } from './nest-app/src/users/users.model';

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

const users = [
  {
    id: uuid(),
    login: 'ivan@stud.com',
    password: 'password',
    age: 20,
    isDeleted: false
  },
  {
    id: uuid(),
    login: 'petr@stud.com',
    password: 'password',
    age: 20,
    isDeleted: false
  },
  {
    id: uuid(),
    login: 'vasia@stud.com',
    password: 'password',
    age: 20,
    isDeleted: false
  },
  {
    id: uuid(),
    login: 'serg@stud.com',
    password: 'password',
    age: 20,
    isDeleted: false
  },
  {
    id: uuid(),
    login: 'tolya@stud.com',
    password: 'password',
    age: 20,
    isDeleted: false
  },
  {
    id: uuid(),
    login: 'andrei@stud.com',
    password: 'password',
    age: 20,
    isDeleted: false
  },
  {
    id: uuid(),
    login: 'sachar@stud.com',
    password: 'password',
    age: 20,
    isDeleted: false
  },
  {
    id: uuid(),
    login: 'kostya@stud.com',
    password: 'password',
    age: 20,
    isDeleted: false
  },
  {
    id: uuid(),
    login: 'kolya@stud.com',
    password: 'password',
    age: 20,
    isDeleted: false
  },
  {
    id: uuid(),
    login: 'anton@stud.com',
    password: 'password',
    age: 20,
    isDeleted: false
  }
];
