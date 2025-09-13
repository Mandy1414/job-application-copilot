import { Request, Response, NextFunction } from 'express';
import { createError } from './errorHandler';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const requireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    throw createError('Authentication required', 401);
  }
  next();
};

export const requireAuthOptional = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  // User may or may not be authenticated - just pass through
  next();
};