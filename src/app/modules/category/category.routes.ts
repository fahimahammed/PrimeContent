import { NextFunction, Request, Response, Router } from 'express';
import { CategoryController } from './category.controller';
import { FileUploadHelper } from '../../utils/fileUploader';

const router = Router();

router.get('/', CategoryController.getAllCategorysHandler);
router.get('/:id', CategoryController.getCategoryByIdHandler);

router.post(
    '/',
    FileUploadHelper.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        return CategoryController.createCategoryHandler(req, res, next);
    }
);

router.patch('/:id', CategoryController.updateCategoryHandler);
router.delete('/:id', CategoryController.deleteCategoryHandler);

export const CategoryRoutes = router;