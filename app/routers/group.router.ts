import express from 'express';
import GroupController from '../controllers/group.controller';
import { validateGroup } from '../middlewares/group.validator';
import { validateUserGroup } from '../middlewares/user-group.validator';

const groupRouter = express.Router();

groupRouter.get('/', GroupController.getAllGroups);
groupRouter.get('/:id', GroupController.getGroupById);
groupRouter.post('/', validateGroup, GroupController.addGroup);
groupRouter.put('/:id', validateGroup, GroupController.updateGroup);
groupRouter.delete('/:id', GroupController.deleteGroup);
groupRouter.post(
  '/:id/addUsers',
  validateUserGroup,
  GroupController.addUsersToGroup
);

export default groupRouter;
