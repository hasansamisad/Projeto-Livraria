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
        const { book_id, url_externa } = req.body; // Captura a URL externa se enviada por texto

        // 1. Verifica se o livro existe
        const book = await Book.findByPk(book_id);
        if (!book) {
          return res.status(400).json({ errors: ['O livro para esta capa não existe.'] });
        }

        // 2. Determina quais dados serão salvos baseado no que o usuário enviou
        let originalname = 'URL_EXTERNA';
        let filename = '';

        if (req.file) {
          // Se enviou arquivo físico via Multer
          originalname = req.file.originalname;
          filename = req.file.filename;
        } else if (url_externa) {
          // Se colou um link da internet
          filename = url_externa;
        } else {
          // Se não enviou nenhum dos dois
          return res.status(400).json({ errors: ['Envie um arquivo de imagem ou insira uma URL de capa válida.'] });
        }

        // 3. Busca todas as capas antigas deste livro para deletar
        const oldCovers = await BookCover.findAll({ where: { book_id } });

        if (oldCovers.length > 0) {
          // Executa a exclusão física APENAS se a capa antiga era um arquivo local
          oldCovers.forEach((cover) => {
            // Se NÃO começar com http, significa que é um arquivo físico na pasta uploads
            if (!cover.filename.startsWith('http://') && !cover.filename.startsWith('https://')) {
              const oldFilePath = path.resolve(__dirname, '..', '..', 'uploads', 'images', cover.filename);
              if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
              }
            }
          });

          // Limpa do banco de dados as capas antigas
          const oldIds = oldCovers.map((cover) => cover.id);
          await BookCover.destroy({ where: { id: oldIds } });
        }

        // 4. Cria o novo registro da capa atualizada (seja local ou URL externa)
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
