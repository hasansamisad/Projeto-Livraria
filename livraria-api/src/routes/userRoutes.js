import { Router } from 'express';

import UserController from '../controllers/UserController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/profile', loginRequired, UserController.show);
router.post('/', UserController.store);

router.put('/profile', loginRequired, UserController.update);
router.delete('/profile', loginRequired, UserController.delete);

export default router;
