import express from 'express';
import GroupController from '../controllers/group.controller';
import { validateGroup } from '../models/group.model';

const groupRouter = express.Router();

groupRouter.get('/', GroupController.getAllGroups);
groupRouter.get('/:id', GroupController.getGroupById);
groupRouter.post('/', validateGroup, GroupController.addGroup);
groupRouter.put('/:id', validateGroup, GroupController.updateGroup);
groupRouter.delete('/:id', GroupController.deleteGroup);

export default groupRouter;
