import request, { Response } from 'supertest';
import { Request, NextFunction } from 'express';

import { app } from '../index';
import { auth } from '../middlewares/auth';
import { GroupService } from '../services/group.service';
import { IGroup, Permission } from '../models/group.model';
import { methodsLogger } from '../utils/methods-logger';

jest.mock('../middlewares/auth');
jest.mock('../utils/methods-logger');
jest.mock('../utils/controller-logger', () => ({
  ControllerLogger: () => (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    const originalMethod: any = descriptor.value;
    descriptor.value = async (...args: any): Promise<void> => {
      try {
        await originalMethod.apply(this, args);
      } catch (e) {
        return;
      }
    };

    return descriptor;
  }
}));

const groupData: IGroup = {
  name: 'group4',
  permissions: [Permission.Write, Permission.UploadFiles, Permission.Delete]
} as IGroup;

describe('GroupController', () => {
  beforeEach(() => {
    (auth as jest.Mock).mockImplementation(
      (req: Request, res: Response, next: NextFunction) =>
        new Promise(() => next())
    );
    (methodsLogger as jest.Mock).mockImplementation(
      (req: Request, res: Response, next: NextFunction) =>
        new Promise(() => next())
    );
  });

  describe('GET /groups/{id}', () => {
    it('should return status 200 with info in the body', async (done: jest.DoneCallback) => {
      const getGroupByIdSpy: jasmine.Spy = spyOn(
        GroupService,
        'getGroupById'
      ).and.returnValue(Promise.resolve(groupData));
      const result: request.Response = await request(app)
        .get('/groups/id')
        .set({ Authorization: 'test token' });
      expect(result.status).toBe(200);
      expect(getGroupByIdSpy).toHaveBeenCalledWith('id');
      expect(result.body).toEqual(groupData);
      done();
    });

    it('should return status 404 with error in the body', async (done: jest.DoneCallback) => {
      const errorGroupData: IGroup = (null as unknown) as IGroup;
      const getGroupByIdSpy: jasmine.Spy = spyOn(
        GroupService,
        'getGroupById'
      ).and.returnValue(errorGroupData);
      const result: request.Response = await request(app)
        .get('/groups/id')
        .set({ Authorization: 'test token' });
      expect(result.status).toBe(404);
      expect(getGroupByIdSpy).toHaveBeenCalledWith('id');
      expect(result.body).toEqual({
        message: 'Group not found'
      });
      done();
    });

    it('should return status 500 and an error in the body', async (done: jest.DoneCallback) => {
      const getGroupByIdSpy: jasmine.Spy = spyOn(
        GroupService,
        'getGroupById'
      ).and.throwError('An error from service');
      const result: request.Response = await request(app)
        .get('/groups/id')
        .set({ Authorization: 'test token' });
      expect(result.status).toBe(500);
      expect(getGroupByIdSpy).toHaveBeenCalledWith('id');
      expect(result.body).toEqual({
        message: 'An error from service'
      });
      done();
    });
  });

  describe('POST /groups', () => {
    it('should return status 201 with info in the body', async (done: jest.DoneCallback) => {
      const addGroupByIdSpy: jasmine.Spy = spyOn(
        GroupService,
        'addGroup'
      ).and.returnValue(Promise.resolve(groupData));
      const result: request.Response = await request(app)
        .post('/groups')
        .send(groupData)
        .set({ Authorization: 'test token' });
      expect(result.status).toBe(201);
      expect(addGroupByIdSpy).toHaveBeenCalledWith(groupData);
      expect(result.body).toEqual(groupData);
      done();
    });

    it('should return status 500 and an error in the body', async (done: jest.DoneCallback) => {
      const addGroupByIdSpy: jasmine.Spy = spyOn(
        GroupService,
        'addGroup'
      ).and.throwError('An error from service');
      const result: request.Response = await request(app)
        .post('/groups')
        .send(groupData)
        .set({ Authorization: 'test token' });
      expect(result.status).toBe(500);
      expect(addGroupByIdSpy).toHaveBeenCalledWith(groupData);
      expect(result.body).toEqual({
        message: 'An error from service'
      });
      done();
    });
  });

  describe('PUT /groups/{id}', () => {
    it('should return status 200 with info in the body', async (done: jest.DoneCallback) => {
      const updateGroupSpy: jasmine.Spy = spyOn(
        GroupService,
        'updateGroup'
      ).and.returnValue(Promise.resolve(groupData));
      const result: request.Response = await request(app)
        .put('/groups/id')
        .send(groupData)
        .set({ Authorization: 'test token' });
      expect(result.status).toBe(200);
      expect(updateGroupSpy).toHaveBeenCalledWith(groupData, 'id');
      expect(result.body).toEqual(groupData);
      done();
    });

    it('should return status 404 with error in the body', async (done: jest.DoneCallback) => {
      const updateGroupSpy: jasmine.Spy = spyOn(
        GroupService,
        'updateGroup'
      ).and.returnValue((null as unknown) as IGroup);
      const result: request.Response = await request(app)
        .put('/groups/id')
        .send(groupData)
        .set({ Authorization: 'test token' });
      expect(result.status).toBe(404);
      expect(updateGroupSpy).toHaveBeenCalledWith(groupData, 'id');
      expect(result.body).toEqual({
        message: 'Group not found'
      });
      done();
    });

    it('should return status 500 and an error in the body', async (done: jest.DoneCallback) => {
      const updateGroupSpy: jasmine.Spy = spyOn(
        GroupService,
        'updateGroup'
      ).and.throwError('An error from service');
      const result: request.Response = await request(app)
        .put('/groups/id')
        .send(groupData)
        .set({ Authorization: 'test token' });
      expect(result.status).toBe(500);
      expect(updateGroupSpy).toHaveBeenCalledWith(groupData, 'id');
      expect(result.body).toEqual({
        message: 'An error from service'
      });
      done();
    });
  });

  describe('GET /groups', () => {
    it('should return status 200 with info in the body', async (done: jest.DoneCallback) => {
      const getAllGroupsSpy: jasmine.Spy = spyOn(
        GroupService,
        'getAllGroups'
      ).and.returnValue(Promise.resolve([groupData, groupData]));
      const result: request.Response = await request(app)
        .get('/groups')
        .set({ Authorization: 'test token' });
      expect(result.status).toBe(200);
      expect(getAllGroupsSpy).toHaveBeenCalled();
      expect(result.body).toEqual([groupData, groupData]);
      done();
    });

    it('should return status 500 and an error in the body', async (done: jest.DoneCallback) => {
      const getAllGroupsSpy: jasmine.Spy = spyOn(
        GroupService,
        'getAllGroups'
      ).and.throwError('An error from service');
      const result: request.Response = await request(app)
        .get('/groups')
        .set({ Authorization: 'test token' });
      expect(result.status).toBe(500);
      expect(getAllGroupsSpy).toHaveBeenCalled();
      expect(result.body).toEqual({
        error: 'An error from service'
      });
      done();
    });
  });

  describe('DELETE /groups/{id}', () => {
    it('should return status 200 with info in the body', async (done: jest.DoneCallback) => {
      const deleteGroupSpy: jasmine.Spy = spyOn(
        GroupService,
        'deleteGroup'
      ).and.returnValue(Promise.resolve(1));
      const result: request.Response = await request(app)
        .delete('/groups/id')
        .set({ Authorization: 'test token' });
      expect(result.status).toBe(200);
      expect(deleteGroupSpy).toHaveBeenCalledWith('id');
      expect(result.body).toEqual({
        message: 'The group was deleted'
      });
      done();
    });

    it('should return status 404 with error in the body', async (done: jest.DoneCallback) => {
      const deleteGroupSpy: jasmine.Spy = spyOn(
        GroupService,
        'deleteGroup'
      ).and.returnValue(0);
      const result: request.Response = await request(app)
        .delete('/groups/id')
        .set({ Authorization: 'test token' });
      expect(result.status).toBe(404);
      expect(deleteGroupSpy).toHaveBeenCalledWith('id');
      expect(result.body).toEqual({
        message: 'Group not found'
      });
      done();
    });

    it('should return status 500 and an error in the body', async (done: jest.DoneCallback) => {
      const deleteGroupSpy: jasmine.Spy = spyOn(
        GroupService,
        'deleteGroup'
      ).and.throwError('An error from service');
      const result: request.Response = await request(app)
        .delete('/groups/id')
        .set({ Authorization: 'test token' });
      expect(result.status).toBe(500);
      expect(deleteGroupSpy).toHaveBeenCalledWith('id');
      expect(result.body).toEqual({
        error: 'An error from service'
      });
      done();
    });
  });

  describe('POST /groups/{id}/addUsers', () => {
    it('should return status 200 with info in the body', async (done: jest.DoneCallback) => {
      const userIds: string[] = ['userId1', 'userId2'];
      const addUsersToGroupSpy: jasmine.Spy = spyOn(
        GroupService,
        'addUsersToGroup'
      ).and.returnValue(Promise.resolve(1));
      const result: request.Response = await request(app)
        .post('/groups/id/addUsers')
        .send({
          userIds
        })
        .set({ Authorization: 'test token' });
      expect(result.status).toBe(200);
      expect(addUsersToGroupSpy).toHaveBeenCalledWith('id', userIds);
      expect(result.body).toEqual({
        message: 'The users was added to the group'
      });
      done();
    });

    it('should return status 404 with error in the body', async (done: jest.DoneCallback) => {
      const userIds: string[] = ['userId1', 'userId2'];
      const addUsersToGroupSpy: jasmine.Spy = spyOn(
        GroupService,
        'addUsersToGroup'
      ).and.returnValue(0);
      const result: request.Response = await request(app)
        .post('/groups/id/addUsers')
        .send({
          userIds
        })
        .set({ Authorization: 'test token' });
      expect(result.status).toBe(404);
      expect(addUsersToGroupSpy).toHaveBeenCalledWith('id', userIds);
      expect(result.body).toEqual({
        message: 'Group not found'
      });
      done();
    });

    it('should return status 500 and an error in the body', async (done: jest.DoneCallback) => {
      const userIds: string[] = ['userId1', 'userId2'];
      const addUsersToGroupSpy: jasmine.Spy = spyOn(
        GroupService,
        'addUsersToGroup'
      ).and.throwError('An error from service');
      const result: request.Response = await request(app)
        .post('/groups/id/addUsers')
        .send({
          userIds
        })
        .set({ Authorization: 'test token' });
      expect(result.status).toBe(500);
      expect(addUsersToGroupSpy).toHaveBeenCalledWith('id', userIds);
      expect(result.body).toEqual({
        error: 'An error from service'
      });
      done();
    });
  });
});
