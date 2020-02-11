import express from 'express';
import UserController from '../controllers/user.controller';
import { validateUser } from '../middlewares/user.validator';

const userRouter = express.Router();

userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:id', UserController.getUserById);
userRouter.post('/', validateUser, UserController.addUser);
userRouter.put('/:id', validateUser, UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);

export default userRouter;
