import { UserService } from '../services/user.service';
import { Request, Response } from 'express';
import { ControllerLogger } from '../utils/controller-logger';
import { UserModel, IUser } from '../models/user.model';

export default class UserController {
  @ControllerLogger()
  public static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user: UserModel | null = await UserService.getUserById(
        req.params.id
      );
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
      throw Error(err.message);
    }
  }

  @ControllerLogger()
  public static async addUser(req: Request, res: Response): Promise<void> {
    const user: IUser = req.body;
    try {
      const addedUser: UserModel = await UserService.addUser(user);
      res.location(`/users/${addedUser.id}`);
      res.status(201).json(addedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
      throw Error(err.message);
    }
  }

  @ControllerLogger()
  public static async updateUser(req: Request, res: Response): Promise<void> {
    const updatedUser: UserModel = req.body;
    try {
      const user: UserModel = await UserService.updateUser(
        updatedUser,
        req.params.id
      );
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
      throw Error(err.message);
    }
  }

  @ControllerLogger()
  public static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const { loginSubstring = '', limit = 10 } = req.query;
      const users: UserModel[] = await UserService.getAllUsers(
        loginSubstring,
        limit
      );
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
      throw Error(err.message);
    }
  }

  @ControllerLogger()
  public static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const deletedUser: UserModel | null = await UserService.deleteUser(
        req.params.id
      );
      if (!deletedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(deletedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
      throw Error(err.message);
    }
  }

  @ControllerLogger()
  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const { login, password } = req.body;
      const token: string = await UserService.login(login, password);
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
      throw Error(err.message);
    }
  }
}
