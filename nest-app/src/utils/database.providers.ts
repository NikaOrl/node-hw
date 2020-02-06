import { Sequelize } from 'sequelize-typescript';

import { User } from '../users/users.model';
import { options } from '../db.config';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: options.connection.host,
        username: options.connection.user,
        database: options.connection.database,
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
