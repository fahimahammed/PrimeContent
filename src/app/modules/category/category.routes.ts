import { Router } from 'express';
import { CategoryController } from './category.controller';

const router = Router();

router.get('/', CategoryController.getAllCategorysHandler);
router.get('/:id', CategoryController.getCategoryByIdHandler);
router.post('/', CategoryController.createCategoryHandler);
router.put('/:id', CategoryController.updateCategoryHandler);
router.delete('/:id', CategoryController.deleteCategoryHandler);

export const CategoryRoutes = router;