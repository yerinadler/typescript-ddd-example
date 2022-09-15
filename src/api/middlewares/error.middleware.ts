import { NextFunction, Request, Response } from 'express';
import { ApplicationError } from '@src/core/errors';

export const errorMiddleware = (err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.httpStatus || 500).json({
    status: err.statusCode || '500',
    error: err.message || 'Unhandled server-side error',
  });
  next();
};
