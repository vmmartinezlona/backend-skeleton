import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prepareErrorMessage } from '../utils';

export const responseMiddleware = (req: Request, res: any, next: NextFunction) => {
  res.success = (data: any) => {
    res.status(StatusCodes.OK).json({
      success: true,
      data: data,
    });
  };

  res.error = (error: any) => {
    res.status(error.status || StatusCodes.BAD_REQUEST).json({
      success: false,
      error: {
        status: error.status || StatusCodes.BAD_REQUEST,
        name: error.name || "",
        message: prepareErrorMessage(error),
        data: error.data || {}
      }
    });
  };

  next();
};
