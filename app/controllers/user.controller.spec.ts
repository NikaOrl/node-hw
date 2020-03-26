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
        const userData: IUser = {
          id: '2f85eb0-407e-11ea-b467-d7f6bf5cef68',
          login: 'ivan@stud.com',
          password: 'password',
          age: 20,
          isDeleted: false,
          token: null
        };
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
        const userData: IUser = (null as unknown) as IUser;
        const getUserByIdSpy: jasmine.Spy = spyOn(
          UserService,
          'getUserById'
        ).and.returnValue(userData);
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
  });

  describe('POST /users/login', () => {
    it('should return status 200 with token in the body', async (done: jest.DoneCallback) => {
      const userData: ILoginData = {
        login: 'test',
        password: 'test password'
      };
      const loginSpy: jasmine.Spy = spyOn(UserService, 'login').and.returnValue(
        Promise.resolve('token')
      );
      const result: request.Response = await request(app)
        .post('/users/login')
        .send(userData);
      expect(result.status).toBe(200);
      expect(loginSpy).toHaveBeenCalledWith(userData.login, userData.password);
      expect(result.body).toEqual({
        token: 'token'
      });
      done();
    });

    it('should return status 500 and an error in the body', async (done: jest.DoneCallback) => {
      const userData: ILoginData = {
        login: 'test',
        password: 'test password'
      };
      const loginSpy: jasmine.Spy = spyOn(UserService, 'login').and.throwError(
        'An error from service'
      );
      const result: request.Response = await request(app)
        .post('/users/login')
        .send(userData);
      expect(result.status).toBe(500);
      expect(loginSpy).toHaveBeenCalledWith(userData.login, userData.password);
      expect(result.body).toEqual({
        error: 'An error from service'
      });
      done();
    });
  });
});
