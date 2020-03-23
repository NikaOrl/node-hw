import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRouter from './routers/user.router';
import groupRouter from './routers/group.router';
import { sequelize } from './config/config';
import {
  uncaughtExceptionLogger,
  uncaughtRejectionLogger
} from './utils/logger';

dotenv.config();

const app: express.Application = express();
const port: string | number = process.env.PORT || 3000;
const corsOptions: cors.CorsOptions = {
  methods: 'GET,PUT,POST,DELETE',
  origin: '*'
};

sequelize.authenticate();

app.use(express.json());
app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use(cors(corsOptions));

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

app.listen(port, (): void => console.log('Server is started'));
