import express from 'express';
import UserController from '../controllers/user.controller';
import { validateUser } from '../middlewares/user.validator';
import { routeDebug } from '../utils/logger';

const userRouter = express.Router();

userRouter.get('/', routeDebug, UserController.getAllUsers);
userRouter.get('/:id', routeDebug, UserController.getUserById);
userRouter.post('/', routeDebug, validateUser, UserController.addUser);
userRouter.put('/:id', routeDebug, validateUser, UserController.updateUser);
userRouter.delete('/:id', routeDebug, UserController.deleteUser);

export default userRouter;
