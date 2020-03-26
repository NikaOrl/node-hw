import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Sequelize } from 'sequelize-typescript';

import userRouter from './routers/user.router';
import groupRouter from './routers/group.router';
import {
  uncaughtExceptionLogger,
  uncaughtRejectionLogger
} from './utils/logger';
import { UserModel } from './models/user.model';
import { GroupModel } from './models/group.model';
import { UserGroupModel } from './models/user-group.model';

dotenv.config();

export const sequelize: Sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST as string,
  username: process.env.DB_USER as string,
  database: process.env.DB_NAME as string,
  define: {
    timestamps: false
  }
});

sequelize.addModels([UserModel, GroupModel, UserGroupModel]);

export const app: express.Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;
const corsOptions: cors.CorsOptions = {
  methods: 'GET,PUT,POST,DELETE',
  origin: '*'
};

app.use(express.json());
app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use(cors(corsOptions));
app.set('port', port);

process.on('uncaughtException', (err: Error) => {
  uncaughtExceptionLogger.error(
    'There is uncaught exception inside application',
    { errorMessage: err.message, stacktrace: err.stack }
  );
});

process.on('unhandledRejection', (reason: any) => {
  uncaughtRejectionLogger.error(
    'There is unhandled promise rejection inside application',
    reason
  );
});

const server: http.Server = http.createServer(app);

if (process.env.NODE_ENV !== 'test') {
  sequelize.authenticate();
  server.listen(port, (): void => console.log('Server is started'));
}
