import express from 'express';

import userRouter from './routers/user.router';
import groupRouter from './routers/group.router';
import { sequelize } from './config/config';
import {
  uncaughtExceptionLogger,
  uncaughtRejectionLogger
} from './utils/logger';

const app: express.Application = express();
const port = process.env.PORT || 3000;

sequelize.authenticate();

app.use(express.json());
app.use('/users', userRouter);
app.use('/groups', groupRouter);

process.on('uncaughtException', err => {
  uncaughtExceptionLogger.error(
    'There is uncaught exception inside application',
    { errorMessage: err.message, stacktrace: err.stack }
  );
});

process.on('unhandledRejection', reason => {
  uncaughtRejectionLogger.error(
    'There is unhandled promise rejection inside application',
    reason
  );
});

app.listen(port, (): void => console.log(`Server is started`));
