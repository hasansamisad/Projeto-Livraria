import multer from 'multer';
import multerConfig from '../config/multerConfig';
import BookCover from '../models/BookCover';
import Book from '../models/Books';

const uploads = multer(multerConfig).single('cover');

class BookCouverController {
  store(req, res) {
    return uploads(req, res, async (error) => {
      if (error) {
        return res.status(400).json({ errors: [error.code] });
      }
      try {
        const { originalname, filename } = req.file;
        const { book_id } = req.body;

        const book = await Book.findByPk(book_id);
        if (!book) {
          return res.status(400).json({ errors: ['O livro para esta capa não existe.'] });
        }
        const cover = await BookCover.create({
          originalname, filename, book_id,
        });

        return res.json(cover);
      } catch (e) {
        return res.status(400).json({ errors: ['Erro ao salvar a capa.'] });
      }
    });
  }
}

export default new BookCouverController();
