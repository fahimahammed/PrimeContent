import { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * A utility function to handle async errors in Express routes.
 * It catches any errors thrown in the async route handler and forwards them to the global error handler.
 *
 * @param fn - The asynchronous route handler function.
 * @returns A new function that wraps the provided handler with error handling.
 */
const catchAsync = (fn: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default catchAsync;
