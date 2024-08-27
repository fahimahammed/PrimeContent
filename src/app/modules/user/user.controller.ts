import { Request, RequestHandler, Response } from 'express';
import { userServices } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const users = await userServices.getAllUsers();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users retrived!',
      meta: users.meta,
      data: users.data,
    });
  },
);

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = await userServices.addUser(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully!',
      data: user,
    });
  },
);

export const userControllers = {
  createUser,
  getUsers,
};
