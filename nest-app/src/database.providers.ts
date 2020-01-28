import { Sequelize } from 'sequelize-typescript';

import { User } from './users/users.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: '127.0.0.1',
        username: 'orlovve1',
        database: 'pg_db',
        define: {
          timestamps: false
        }
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    }
  }
];
