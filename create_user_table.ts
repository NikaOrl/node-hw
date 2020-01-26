import Knex from 'knex';
import { options } from './db.config';
import { v1 as uuid } from 'uuid';

export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

const knex: Knex = Knex(options as Knex.Config);

const users: User[] = [
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

knex.schema
  .dropTable('users') // dropping for the creating
  .createTable('users', (table: Knex.TableBuilder) => {
    // creating
    table.string('id');
    table.string('login');
    table.string('password');
    table.integer('age');
    table.boolean('isDeleted');
  })
  .then(() => {
    console.log('table users created');
  })
  .catch((err: Error) => {
    console.log(err);
    throw err;
  })
  .then(() => {
    knex('users') // inserting
      .insert(users)
      .then(() => console.log('users inserted'))
      .catch(err => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
  });
