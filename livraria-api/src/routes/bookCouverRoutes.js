import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';
import bookCoverController from '../controllers/BookCouverController';

const router = new Router();

router.post('/', loginRequired, bookCoverController.store);

export default router;
