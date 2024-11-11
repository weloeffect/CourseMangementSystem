import { Request, Response, NextFunction } from 'express'
import logger from '../utils/logger';
import { MyError } from '../utils/MyError';

const errorHandler = (err: Error | MyError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err instanceof MyError ? err.statusCode : 500;
  const message = err.message || 'An unexpected error occurred. Please try again';


  logger.error(`Error: ${message}, Status Code: ${statusCode}`);

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });

};

export default errorHandler;
