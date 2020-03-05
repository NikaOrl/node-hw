import { UserService } from '../services/user.service';
import { Request, Response } from 'express';
import { ControllerLogger } from '../utils/logger';

export default class UserController {
  @ControllerLogger()
  public static async getUserById(req: Request, res: Response) {
    try {
      const user = await UserService.getUserById(req.params.id);
      user
        ? res.status(200).json(user)
        : res.status(404).json({ mesage: 'User not found' });
    } catch (err) {
      res.status(500).json({ mesage: err.mesage });
    }
  }

  @ControllerLogger()
  public static async addUser(req: Request, res: Response) {
    const user = req.body;
    try {
      const addedUser = await UserService.addUser(user);
      res.location(`/users/${addedUser.id}`);
      return res.status(201).json(addedUser);
    } catch (err) {
      res.status(500).json({ mesage: err.mesage });
    }
  }

  @ControllerLogger()
  public static async updateUser(req: Request, res: Response) {
    const updatedUser = req.body;
    try {
      const user = await UserService.updateUser(updatedUser, req.params.id);
      if (!user) return res.status(404).json({ mesage: 'User not found' });
      return res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ mesage: err.mesage });
    }
  }

  @ControllerLogger()
  public static async getAllUsers(req: Request, res: Response) {
    try {
      const { loginSubstring = '', limit = 10 } = req.query;
      const users = await UserService.getAllUsers(loginSubstring, limit);
      return res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  @ControllerLogger()
  public static async deleteUser(req: Request, res: Response) {
    try {
      const deletedUser = await UserService.deleteUser(req.params.id);
      if (!deletedUser)
        return res.status(404).json({ mesage: 'User not found' });
      return res.status(200).json(deletedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
