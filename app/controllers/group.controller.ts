import { Request, Response } from 'express';
import { GroupService } from '../services/group.service';
import { ControllerLogger } from '../utils/logger';
import { GroupModel, IGroup } from '../models/group.model';
import { UserGroupModel } from '../models/user-group.model';

export default class GroupController {
  @ControllerLogger()
  public static async getGroupById(req: Request, res: Response): Promise<void> {
    try {
      const Group: GroupModel | null = await GroupService.getGroupById(
        req.params.id
      );
      if (!Group) {
        res.status(404).json({ message: 'Group not found' });
        return;
      }
      res.status(200).json(Group);
    } catch (err) {
      res.status(500).json({ message: err.message });
      throw Error(err.message);
    }
  }

  @ControllerLogger()
  public static async addGroup(req: Request, res: Response): Promise<void> {
    const Group: IGroup = req.body;
    try {
      const addedGroup: GroupModel = await GroupService.addGroup(Group);
      res.location(`/Groups/${addedGroup.id}`);
      res.status(201).json(addedGroup);
    } catch (err) {
      res.status(500).json({ message: err.message });
      throw Error(err.message);
    }
  }

  @ControllerLogger()
  public static async updateGroup(req: Request, res: Response): Promise<void> {
    const updatedGroup: GroupModel = req.body;
    try {
      const Group: GroupModel = await GroupService.updateGroup(
        updatedGroup,
        req.params.id
      );
      if (!Group) {
        res.status(404).json({ message: 'Group not found' });
        return;
      }
      res.status(200).json(Group);
    } catch (err) {
      res.status(500).json({ message: err.message });
      throw Error(err.message);
    }
  }

  @ControllerLogger()
  public static async getAllGroups(req: Request, res: Response): Promise<void> {
    try {
      const Groups: GroupModel[] = await GroupService.getAllGroups();
      res.status(200).json(Groups);
    } catch (err) {
      res.status(500).json({ error: err.message });
      throw Error(err.message);
    }
  }

  @ControllerLogger()
  public static async deleteGroup(req: Request, res: Response): Promise<void> {
    try {
      const numberOfDeletedGroups: number = await GroupService.deleteGroup(
        req.params.id
      );
      if (!numberOfDeletedGroups || numberOfDeletedGroups < 1) {
        res.status(404).json({ message: 'Group not found' });
        return;
      }
      res.status(200).json({ message: 'The group was deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
      throw Error(err.message);
    }
  }

  @ControllerLogger()
  public static async addUsersToGroup(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const recs: Error | UserGroupModel[] = await GroupService.addUsersToGroup(
        req.params.id,
        req.body.userIds
      );
      if (!recs) {
        res.status(404).json({ message: 'Group not found' });
        return;
      }
      res.status(200).json({ message: 'The users was added to the group' });
    } catch (err) {
      res.status(500).json({ error: err.message });
      throw Error(err.message);
    }
  }
}
