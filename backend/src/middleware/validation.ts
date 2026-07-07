import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { CustomError } from './errorHandler';

export const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const customErr: CustomError = new Error('Validation failed');
        customErr.statusCode = 400;
        customErr.errors = error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        return next(customErr);
      }
      next(error);
    }
  };
};
