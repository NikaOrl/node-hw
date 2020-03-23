import { Request, NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserDAO } from '../data-access/user.dao';
import { UserModel } from '../models/user.model';

interface IPayload {
  login: string;
  password: string;
}

export async function auth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  let token: string | undefined = req.header('Authorization');
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }
  token = token.replace('Bearer ', '');
  try {
    const data: IPayload = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as IPayload;
    const userRecord: UserModel | null = await UserDAO.findByLogin(data.login);
    if (
      !userRecord ||
      userRecord.token !== token ||
      userRecord.password !== data.password
    ) {
      throw new Error('Invalid token provided');
    }
    return next();
  } catch (e) {
    res.status(403).json(e.message);
  }
}
