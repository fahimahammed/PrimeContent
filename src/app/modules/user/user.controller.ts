import { NextFunction, Request, Response } from 'express';
import { userServices } from './user.service';

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userServices.getAllUsers();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve users', error });
    }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userServices.addUser(req.body);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

export const userControllers = {
    createUser,
    getUsers
};
