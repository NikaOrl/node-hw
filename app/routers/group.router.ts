import express, { Router } from 'express';
import GroupController from '../controllers/group.controller';
import { validateGroup } from '../middlewares/group.validator';
import { validateUserGroup } from '../middlewares/user-group.validator';
import { methodsLogger } from '../utils/methods-logger';
import { auth } from '../middlewares/auth';

const groupRouter: Router = express.Router();

groupRouter.get('/', methodsLogger, auth, GroupController.getAllGroups);
groupRouter.get('/:id', methodsLogger, auth, GroupController.getGroupById);
groupRouter.post(
  '/',
  methodsLogger,
  auth,
  validateGroup,
  GroupController.addGroup
);
groupRouter.put(
  '/:id',
  methodsLogger,
  auth,
  validateGroup,
  GroupController.updateGroup
);
groupRouter.delete('/:id', methodsLogger, auth, GroupController.deleteGroup);
groupRouter.post(
  '/:id/addUsers',
  methodsLogger,
  auth,
  validateUserGroup,
  GroupController.addUsersToGroup
);

export default groupRouter;
