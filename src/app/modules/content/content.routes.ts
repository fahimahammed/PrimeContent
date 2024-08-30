import { Router } from 'express';
import { ContentController } from './content.controller';

const router = Router();

router.post('/', ContentController.createContentHandler);
router.get('/', ContentController.getAllContentsHandler);
router.get('/:id', ContentController.getContentByIdHandler);
router.put('/:id', ContentController.updateContentHandler);
router.delete('/:id', ContentController.deleteContentHandler);

export const ContentRoutes = router;