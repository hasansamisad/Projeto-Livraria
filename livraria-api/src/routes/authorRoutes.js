import { Router } from 'express';
import AuthorController from '../controllers/AuthorController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', AuthorController.index);
router.post('/', loginRequired, AuthorController.store);
router.put('/:id', loginRequired, AuthorController.update);
router.get('/:id', AuthorController.show);
router.delete('/:id', loginRequired, AuthorController.delete);

export default router;
