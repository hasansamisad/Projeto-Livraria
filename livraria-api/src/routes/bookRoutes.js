import { Router } from 'express';

import BookController from '../controllers/BookController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Publico: Qualquer um pode listar e ver detalhes do livro
router.get('/', BookController.index);
router.get('/:id', BookController.show);

// Privado: criação, edição e exclusão
router.post('/', loginRequired, BookController.store);
router.put('/:id', loginRequired, BookController.update);
router.delete('/:id', loginRequired, BookController.delete);

export default router;
