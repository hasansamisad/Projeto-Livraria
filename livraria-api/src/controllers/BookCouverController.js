import fs from 'fs';
import path from 'path';
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

        // 1. Verifica se o livro existe
        const book = await Book.findByPk(book_id);
        if (!book) {
          return res.status(400).json({ errors: ['O livro para esta capa não existe.'] });
        }

        // 2. Busca todas as capas antigas deste livro
        const oldCovers = await BookCover.findAll({ where: { book_id } });

        if (oldCovers.length > 0) {
          // Executa a exclusão física de todos os arquivos em paralelo
          oldCovers.forEach((cover) => {
            const oldFilePath = path.resolve(__dirname, '..', '..', 'uploads', 'images', cover.filename);
            if (fs.existsSync(oldFilePath)) {
              fs.unlinkSync(oldFilePath);
            }
          });

          // Mapeia os IDs das capas antigas e deleta todas do banco em uma única query!
          const oldIds = oldCovers.map((cover) => cover.id);
          await BookCover.destroy({ where: { id: oldIds } });
        }

        // 3. Cria o novo registro da capa atualizada
        const cover = await BookCover.create({
          originalname,
          filename,
          book_id,
        });

        return res.json(cover);
      } catch (e) {
        console.error('Erro ao salvar/substituir capa:', e);
        return res.status(400).json({ errors: ['Erro ao salvar a capa.'] });
      }
    });
  }
}

export default new BookCouverController();
