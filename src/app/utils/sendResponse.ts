import { Response } from 'express';

/**
 * Utility function to standardize API responses.
 *
 * @param res - The Express Response object.
 * @param jsonData - The response data to send.
 * @param jsonData.statusCode - HTTP status code for the response.
 * @param jsonData.success - Indicates if the request was successful.
 * @param jsonData.message - Message describing the result of the request.
 * @param jsonData.meta - Optional metadata for pagination.
 * @param jsonData.data - The actual data to send in the response.
 */
const sendResponse = <T>(
  res: Response,
  jsonData: {
    statusCode: number;
    success: boolean;
    message: string;
    meta?: {
      page: number;
      limit: number;
      total: number;
    };
    data: T | null | undefined;
  },
): void => {
  const { statusCode, success, message, meta, data } = jsonData;

  res.status(statusCode).json({
    success,
    message,
    meta: meta ?? null,
    data: data ?? null,
  });
};

export default sendResponse;
