import express from 'express';
import { Sequelize } from 'sequelize-typescript';

import userRouter from './routers/user.router';

import { UserModel } from './models/user.model';
import { options } from '../db.config';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: options.connection.host,
  username: options.connection.user,
  database: options.connection.database,
  define: {
    timestamps: false
  }
});
sequelize.addModels([UserModel]);

sequelize.authenticate();

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRouter);

app.listen(port, (): void => console.log(`Server is started`));
