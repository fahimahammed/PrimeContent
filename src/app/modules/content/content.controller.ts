import { Request, Response } from 'express';
import { ContentService } from './content.service';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createContentHandler = catchAsync(async (req: Request, res: Response) => {
    const data = await ContentService.createContent(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Content created successfully',
        data,
    });
});

const getAllContentsHandler = catchAsync(async (req: Request, res: Response) => {
    const result = await ContentService.getAllContents();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Contents retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
});

const getContentByIdHandler = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await ContentService.getContentById(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Content retrieved successfully',
        data,
    });
});

const updateContentHandler = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await ContentService.updateContent(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Content updated successfully',
        data,
    });
});

const deleteContentHandler = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await ContentService.deleteContent(id);
    sendResponse(res, {
        statusCode: httpStatus.NO_CONTENT,
        success: true,
        message: 'Content deleted successfully',
        data: result
    });
});

export const ContentController = {
    createContentHandler,
    getAllContentsHandler,
    getContentByIdHandler,
    updateContentHandler,
    deleteContentHandler,
};