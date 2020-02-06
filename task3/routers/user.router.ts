import express from 'express';
import UserController from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:id', UserController.getUserById);
userRouter.post('/', UserController.addUser);
userRouter.put('/:id', UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);

export default userRouter;
