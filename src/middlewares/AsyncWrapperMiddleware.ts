import { NextFunction, Request, Response } from 'express';

// Middleware to catch async errors
// NOTE: This middleware will catch only errors throws in async functions
// It will not catch stream or promise rejection errors (which can potentially crash the process)
// If the function is not asynchronous then you don't need to wrap it with this middleware
export const asyncWrapperMiddleware = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, in this case the error handler.
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};
