import express, { Router } from 'express';
import UserController from '../controllers/user.controller';
import { validateUser } from '../middlewares/user.validator';
import { methodsLogger } from '../utils/logger';
import { auth } from '../middlewares/auth';

const userRouter: Router = express.Router();

userRouter.get('/', methodsLogger, auth, UserController.getAllUsers);
userRouter.get('/:id', methodsLogger, auth, UserController.getUserById);
userRouter.post('/', methodsLogger, auth, validateUser, UserController.addUser);
userRouter.put(
  '/:id',
  methodsLogger,
  auth,
  validateUser,
  UserController.updateUser
);
userRouter.delete('/:id', methodsLogger, auth, UserController.deleteUser);
userRouter.post('/login', methodsLogger, UserController.login);

export default userRouter;
