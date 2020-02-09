import express from 'express';
import { Sequelize } from 'sequelize-typescript';

import userRouter from './routers/user.router';
import groupRouter from './routers/group.router';
import { UserModel } from './models/user.model';
import { options } from '../db.config';
import { GroupModel } from './models/group.model';
import { UserGroupModel } from './models/user-group.model';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: options.connection.host,
  username: options.connection.user,
  database: options.connection.database,
  define: {
    timestamps: false
  }
});
sequelize.addModels([UserModel, GroupModel, UserGroupModel]);

sequelize.authenticate();

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.listen(port, (): void => console.log(`Server is started`));
