import express from 'express';
import UserController from '../controllers/user.controller';
import { validateUser } from '../middlewares/user.validator';
import { methodsLogger } from '../utils/logger';

const userRouter = express.Router();

userRouter.get('/', methodsLogger, UserController.getAllUsers);
userRouter.get('/:id', methodsLogger, UserController.getUserById);
userRouter.post('/', methodsLogger, validateUser, UserController.addUser);
userRouter.put('/:id', methodsLogger, validateUser, UserController.updateUser);
userRouter.delete('/:id', methodsLogger, UserController.deleteUser);

export default userRouter;
