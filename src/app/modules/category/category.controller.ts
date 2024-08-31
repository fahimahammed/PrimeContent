import { Request, Response } from 'express';
import { CategoryService } from './category.service';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';


const createCategoryHandler = catchAsync(async (req: Request, res: Response) => {
    const data = await CategoryService.createCategory(req);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Category created successfully',
        data,
    });
});

const getAllCategorysHandler = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryService.getAllCategorys();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Categorys retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
});

const getCategoryByIdHandler = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await CategoryService.getCategoryById(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category retrieved successfully',
        data,
    });
});

const updateCategoryHandler = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await CategoryService.updateCategory(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category updated successfully',
        data,
    });
});

const deleteCategoryHandler = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await CategoryService.deleteCategory(id);
    sendResponse(res, {
        statusCode: httpStatus.NO_CONTENT,
        success: true,
        message: 'Category deleted successfully',
        data: result
    });
});

export const CategoryController = {
    createCategoryHandler,
    getAllCategorysHandler,
    getCategoryByIdHandler,
    updateCategoryHandler,
    deleteCategoryHandler,
};