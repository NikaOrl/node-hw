import { NextFunction, Request, Response } from 'express';

import { winstonMethodsLogger } from './logger';

export function methodsLogger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const {
    method,
    params,
    body,
    route: { path },
    baseUrl
  } = req;
  winstonMethodsLogger.debug('Service methods logger', {
    baseUrl,
    path,
    method,
    params,
    body
  });
  next();
}
