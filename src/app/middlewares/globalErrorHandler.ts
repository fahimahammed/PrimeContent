/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../config";

// Define a type for error details to capture different kinds of error details
interface ErrorDetails {
  message?: string;
  meta?: object;
  [key: string]: any; // To capture any additional properties
}

// Error handler middleware for global error handling
const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Default values
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  const success: boolean = false;
  let message: string = "An unexpected error occurred";
  let errorDetails: ErrorDetails = {};

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Validation Error";
    errorDetails = { message: err.message };
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = httpStatus.BAD_REQUEST;

    switch (err.code) {
      case "P2002":
        message = "Duplicate Key Error";
        errorDetails = { meta: err.meta };
        break;
      default:
        message = "Prisma Client Error";
        errorDetails = { message: err.message };
    }
  } else if (err instanceof Error) {
    message = err.message;
    errorDetails = { message: err.message };
  } else {
    errorDetails = { error: err };
  }

  res.status(statusCode).json({
    success,
    message,
    error: errorDetails,
    stack: config.environment === "development" ? (err as Error).stack : null,
  });
};

export default globalErrorHandler;
