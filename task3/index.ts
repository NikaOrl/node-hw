import express from 'express';

import userRouter from './routers/user.router';

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRouter);

app.listen(port, (): void => console.log(`Server is started`));
