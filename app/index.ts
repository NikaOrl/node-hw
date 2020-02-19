import express from 'express';

import userRouter from './routers/user.router';
import groupRouter from './routers/group.router';
import { sequelize } from './config/config';

const app: express.Application = express();
const port = process.env.PORT || 3000;

sequelize.authenticate();

app.use(express.json());
app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.listen(port, (): void => console.log(`Server is started`));
