import express from 'express';
import GroupController from '../controllers/group.controller';
import { validateGroup } from '../middlewares/group.validator';
import { validateUserGroup } from '../middlewares/user-group.validator';
import { methodsLogger } from '../utils/logger';

const groupRouter = express.Router();

groupRouter.get('/', methodsLogger, GroupController.getAllGroups);
groupRouter.get('/:id', methodsLogger, GroupController.getGroupById);
groupRouter.post('/', methodsLogger, validateGroup, GroupController.addGroup);
groupRouter.put(
  '/:id',
  methodsLogger,
  validateGroup,
  GroupController.updateGroup
);
groupRouter.delete('/:id', methodsLogger, GroupController.deleteGroup);
groupRouter.post(
  '/:id/addUsers',
  methodsLogger,
  validateUserGroup,
  GroupController.addUsersToGroup
);

export default groupRouter;
