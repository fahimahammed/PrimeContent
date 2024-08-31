/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import httpStatus from "http-status";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import rateLimit from "express-rate-limit";

const app: Application = express();

// Rate Limiting Configuration
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (15 minutes)
  message: {
    success: false,
    statusCode: httpStatus.TOO_MANY_REQUESTS,
    message: "Too many requests, please try again later.",
  },
  headers: true, // Enable rate limit headers
});

// Apply the rate limiter to all API requests
app.use("/api/v1/", apiLimiter);

// Middleware Setup
app.use(
  cors({
    origin: "http://localhost:3000", // specify allowed origins
    credentials: true, // allow credentials (cookies, authorization headers, etc.)
  }),
);
app.use(cookieParser());

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

// Test Route
app.get("/api/v1/test", (req: Request, res: Response) => {
  console.log(req.socket.remoteAddress);
  const userIp =
    (req.headers["x-forwarded-for"] as string) || req.ip || "Unknown IP";
  const userAgent = req.headers["user-agent"] || "Unknown User-Agent";
  const requestTime = new Date().toISOString();

  res.status(httpStatus.OK).json({
    success: true,
    message: "Test Message!",
    data: {
      message: "Working!!",
      ip: userIp,
      userAgent: userAgent,
      requestTime: requestTime,
    },
  });
});

// Error handler
app.use(globalErrorHandler);

// Handle 404 Errors
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "The requested path is not found!",
    },
  });
});

// Global Error Handling Middleware
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: err,
  });
});

export default app;
