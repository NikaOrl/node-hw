import request, { Response } from 'supertest';

import { ILoginData, IUser } from '../models/user.model';
import { UserService } from '../services/user.service';
import { app } from '../index';
import { auth } from '../middlewares/auth';
import { Request, NextFunction } from 'express';
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

const userData: IUser = {
  login: 'ivan@stud.com',
  password: 'nika1ghj',
  age: 20
} as IUser;

describe('UserController', () => {
  beforeEach(() => {
    (methodsLogger as jest.Mock).mockImplementation(
      (req: Request, res: Response, next: NextFunction) =>
        new Promise(() => next())
    );
  });

  describe('after auth', () => {
    beforeEach(() => {
      (auth as jest.Mock).mockImplementation(
        (req: Request, res: Response, next: NextFunction) =>
          new Promise(() => next())
      );
    });

    describe('GET /users/{id}', () => {
      it('should return status 200 with info in the body', async (done: jest.DoneCallback) => {
        const getUserByIdSpy: jasmine.Spy = spyOn(
          UserService,
          'getUserById'
        ).and.returnValue(Promise.resolve(userData));
        const result: request.Response = await request(app)
          .get('/users/id')
          .set({ Authorization: 'test token' });
        expect(result.status).toBe(200);
        expect(getUserByIdSpy).toHaveBeenCalledWith('id');
        expect(result.body).toEqual(userData);
        done();
      });

      it('should return status 404 with error in the body', async (done: jest.DoneCallback) => {
        const errorUserData: IUser = (null as unknown) as IUser;
        const getUserByIdSpy: jasmine.Spy = spyOn(
          UserService,
          'getUserById'
        ).and.returnValue(errorUserData);
        const result: request.Response = await request(app)
          .get('/users/id')
          .set({ Authorization: 'test token' });
        expect(result.status).toBe(404);
        expect(getUserByIdSpy).toHaveBeenCalledWith('id');
        expect(result.body).toEqual({
          message: 'User not found'
        });
        done();
      });

      it('should return status 500 and an error in the body', async (done: jest.DoneCallback) => {
        const getUserByIdSpy: jasmine.Spy = spyOn(
          UserService,
          'getUserById'
        ).and.throwError('An error from service');
        const result: request.Response = await request(app)
          .get('/users/id')
          .set({ Authorization: 'test token' });
        expect(result.status).toBe(500);
        expect(getUserByIdSpy).toHaveBeenCalledWith('id');
        expect(result.body).toEqual({
          message: 'An error from service'
        });
        done();
      });
    });

    describe('POST /users', () => {
      it('should return status 201 with info in the body', async (done: jest.DoneCallback) => {
        const addUserByIdSpy: jasmine.Spy = spyOn(
          UserService,
          'addUser'
        ).and.returnValue(Promise.resolve(userData));
        const result: request.Response = await request(app)
          .post('/users')
          .send(userData)
          .set({ Authorization: 'test token' });
        expect(result.status).toBe(201);
        expect(addUserByIdSpy).toHaveBeenCalledWith(userData);
        expect(result.body).toEqual(userData);
        done();
      });

      it('should return status 500 and an error in the body', async (done: jest.DoneCallback) => {
        const addUserByIdSpy: jasmine.Spy = spyOn(
          UserService,
          'addUser'
        ).and.throwError('An error from service');
        const result: request.Response = await request(app)
          .post('/users')
          .send(userData)
          .set({ Authorization: 'test token' });
        expect(result.status).toBe(500);
        expect(addUserByIdSpy).toHaveBeenCalledWith(userData);
        expect(result.body).toEqual({
          message: 'An error from service'
        });
        done();
      });
    });

    describe('PUT /users/{id}', () => {
      it('should return status 200 with info in the body', async (done: jest.DoneCallback) => {
        const updateUserSpy: jasmine.Spy = spyOn(
          UserService,
          'updateUser'
        ).and.returnValue(Promise.resolve(userData));
        const result: request.Response = await request(app)
          .put('/users/id')
          .send(userData)
          .set({ Authorization: 'test token' });
        expect(result.status).toBe(200);
        expect(updateUserSpy).toHaveBeenCalledWith(userData, 'id');
        expect(result.body).toEqual(userData);
        done();
      });

      it('should return status 404 with error in the body', async (done: jest.DoneCallback) => {
        const updateUserSpy: jasmine.Spy = spyOn(
          UserService,
          'updateUser'
        ).and.returnValue((null as unknown) as IUser);
        const result: request.Response = await request(app)
          .put('/users/id')
          .send(userData)
          .set({ Authorization: 'test token' });
        expect(result.status).toBe(404);
        expect(updateUserSpy).toHaveBeenCalledWith(userData, 'id');
        expect(result.body).toEqual({
          message: 'User not found'
        });
        done();
      });

      it('should return status 500 and an error in the body', async (done: jest.DoneCallback) => {
        const updateUserSpy: jasmine.Spy = spyOn(
          UserService,
          'updateUser'
        ).and.throwError('An error from service');
        const result: request.Response = await request(app)
          .put('/users/id')
          .send(userData)
          .set({ Authorization: 'test token' });
        expect(result.status).toBe(500);
        expect(updateUserSpy).toHaveBeenCalledWith(userData, 'id');
        expect(result.body).toEqual({
          message: 'An error from service'
        });
        done();
      });
    });

    describe('GET /users', () => {
      it('should return status 200 with info in the body', async (done: jest.DoneCallback) => {
        const getAllUsersSpy: jasmine.Spy = spyOn(
          UserService,
          'getAllUsers'
        ).and.returnValue(Promise.resolve([userData, userData]));
        const result: request.Response = await request(app)
          .get('/users')
          .set({ Authorization: 'test token' });
        expect(result.status).toBe(200);
        expect(getAllUsersSpy).toHaveBeenCalled();
        expect(result.body).toEqual([userData, userData]);
        done();
      });

      it('should return status 500 and an error in the body', async (done: jest.DoneCallback) => {
        const getAllUsersSpy: jasmine.Spy = spyOn(
          UserService,
          'getAllUsers'
        ).and.throwError('An error from service');
        const result: request.Response = await request(app)
          .get('/users')
          .set({ Authorization: 'test token' });
        expect(result.status).toBe(500);
        expect(getAllUsersSpy).toHaveBeenCalled();
        expect(result.body).toEqual({
          error: 'An error from service'
        });
        done();
      });
    });

    describe('DELETE /users/{id}', () => {
      it('should return status 200 with info in the body', async (done: jest.DoneCallback) => {
        const deleteUserSpy: jasmine.Spy = spyOn(
          UserService,
          'deleteUser'
        ).and.returnValue(Promise.resolve(1));
        const result: request.Response = await request(app)
          .delete('/users/id')
          .set({ Authorization: 'test token' });
        expect(result.status).toBe(200);
        expect(deleteUserSpy).toHaveBeenCalledWith('id');
        expect(result.body).toEqual({
          message: 'The user was deleted'
        });
        done();
      });

      it('should return status 404 with error in the body', async (done: jest.DoneCallback) => {
        const deleteUserSpy: jasmine.Spy = spyOn(
          UserService,
          'deleteUser'
        ).and.returnValue(0);
        const result: request.Response = await request(app)
          .delete('/users/id')
          .set({ Authorization: 'test token' });
        expect(result.status).toBe(404);
        expect(deleteUserSpy).toHaveBeenCalledWith('id');
        expect(result.body).toEqual({
          message: 'User not found'
        });
        done();
      });

      it('should return status 500 and an error in the body', async (done: jest.DoneCallback) => {
        const deleteUserSpy: jasmine.Spy = spyOn(
          UserService,
          'deleteUser'
        ).and.throwError('An error from service');
        const result: request.Response = await request(app)
          .delete('/users/id')
          .set({ Authorization: 'test token' });
        expect(result.status).toBe(500);
        expect(deleteUserSpy).toHaveBeenCalledWith('id');
        expect(result.body).toEqual({
          error: 'An error from service'
        });
        done();
      });
    });
  });

  describe('POST /users/login', () => {
    it('should return status 200 with token in the body', async (done: jest.DoneCallback) => {
      const userLoginData: ILoginData = {
        login: 'test',
        password: 'test password'
      };
      const loginSpy: jasmine.Spy = spyOn(UserService, 'login').and.returnValue(
        Promise.resolve('token')
      );
      const result: request.Response = await request(app)
        .post('/users/login')
        .send(userLoginData);
      expect(result.status).toBe(200);
      expect(loginSpy).toHaveBeenCalledWith(
        userLoginData.login,
        userLoginData.password
      );
      expect(result.body).toEqual({
        token: 'token'
      });
      done();
    });

    it('should return status 500 and an error in the body', async (done: jest.DoneCallback) => {
      const userLoginData: ILoginData = {
        login: 'test',
        password: 'test password'
      };
      const loginSpy: jasmine.Spy = spyOn(UserService, 'login').and.throwError(
        'An error from service'
      );
      const result: request.Response = await request(app)
        .post('/users/login')
        .send(userLoginData);
      expect(result.status).toBe(500);
      expect(loginSpy).toHaveBeenCalledWith(
        userLoginData.login,
        userLoginData.password
      );
      expect(result.body).toEqual({
        error: 'An error from service'
      });
      done();
    });
  });
});
