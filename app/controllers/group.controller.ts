import { Request, Response } from 'express';
import { GroupService } from '../services/group.service';

export default class GroupController {
  public static async getGroupById(req: Request, res: Response) {
    try {
      const Group = await GroupService.getGroupById(req.params.id);
      Group
        ? res.status(200).json(Group)
        : res.status(404).json({ mesage: 'Group not found' });
    } catch (err) {
      res.status(500).json({ mesage: err.mesage });
    }
  }

  public static async addGroup(req: Request, res: Response) {
    const Group = req.body;
    try {
      const addedGroup = await GroupService.addGroup(Group);
      res.location(`/Groups/${addedGroup.id}`);
      return res.status(201).json(addedGroup);
    } catch (err) {
      res.status(500).json({ mesage: err.mesage });
    }
  }

  public static async updateGroup(req: Request, res: Response) {
    const updatedGroup = req.body;
    try {
      const Group = await GroupService.updateGroup(updatedGroup, req.params.id);
      if (!Group) return res.status(404).json({ mesage: 'Group not found' });
      return res.status(200).json(Group);
    } catch (err) {
      res.status(500).json({ mesage: err.mesage });
    }
  }

  public static async getAllGroups(req: Request, res: Response) {
    try {
      const Groups = await GroupService.getAllGroups();
      return res.status(200).json(Groups);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  public static async deleteGroup(req: Request, res: Response) {
    try {
      const numberOfDeletedGroups = await GroupService.deleteGroup(
        req.params.id
      );
      if (!numberOfDeletedGroups || numberOfDeletedGroups < 1)
        return res.status(404).json({ mesage: 'Group not found' });
      return res.status(200).json({ message: 'The group was deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
