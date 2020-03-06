import express from 'express';
import GroupController from '../controllers/group.controller';
import { validateGroup } from '../middlewares/group.validator';
import { validateUserGroup } from '../middlewares/user-group.validator';
import { routeDebug } from '../utils/logger';

const groupRouter = express.Router();

groupRouter.get('/', routeDebug, GroupController.getAllGroups);
groupRouter.get('/:id', routeDebug, GroupController.getGroupById);
groupRouter.post('/', routeDebug, validateGroup, GroupController.addGroup);
groupRouter.put('/:id', routeDebug, validateGroup, GroupController.updateGroup);
groupRouter.delete('/:id', routeDebug, GroupController.deleteGroup);
groupRouter.post(
  '/:id/addUsers',
  routeDebug,
  validateUserGroup,
  GroupController.addUsersToGroup
);

export default groupRouter;
