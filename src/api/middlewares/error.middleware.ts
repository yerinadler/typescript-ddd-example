import { NextFunction, Request, Response } from 'express';
import { ApplicationError } from '@src/core/errors';
import { isCelebrateError } from 'celebrate';
import { logger } from '@src/infrastructure/logger/winston';

export const errorMiddleware = (err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
  if (isCelebrateError(err)) {
    logger.error('Detected Celebrate error object', err);
    err.httpStatus = 400;
    err.statusCode = '400';
  }
  next(err);
};

export const errorHandlerTerminal = (err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
  logger.error('Handled error\ncode = %s\nhttp status = %s\ndetails = %s', err.httpStatus, err.statusCode, err.message);
  res.status(err.httpStatus || 500).json({
    status: err.statusCode || '500',
    error: err.message || 'Unhandled server-side error',
  });
  next();
}