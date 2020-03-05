import { Request, Response } from 'express';
import { GroupService } from '../services/group.service';
import { ControllerLogger } from '../utils/logger';

export default class GroupController {
  @ControllerLogger()
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

  @ControllerLogger()
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

  @ControllerLogger()
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

  @ControllerLogger()
  public static async getAllGroups(req: Request, res: Response) {
    try {
      const Groups = await GroupService.getAllGroups();
      return res.status(200).json(Groups);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  @ControllerLogger()
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

  @ControllerLogger()
  public static async addUsersToGroup(req: Request, res: Response) {
    try {
      const a = await GroupService.addUsersToGroup(
        req.params.id,
        req.body.userIds
      );
      if (!a) return res.status(404).json({ mesage: 'Group not found' });
      return res
        .status(200)
        .json({ message: 'The users was added to the group' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
