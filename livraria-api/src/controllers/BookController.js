import { Op } from 'sequelize';
import Book from '../models/Books';
import BookCover from '../models/BookCover';
import Author from '../models/Authors';

class BookController {
  async index(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 1; // Página atual, padrão para 1
      const limit = parseInt(req.query.limit, 10) || 10;
      const offset = (page - 1) * limit; // Cálculo do offset para a consulta

      const { search, genre, authorId } = req.query;

      const whereCondition = {};

      // Validação defensiva: só filtra se a string não for vazia
      if (search && search.trim() !== '') {
        whereCondition.title = {
          [Op.iLike]: `%${search}%`,
        };
      }

      if (genre && genre.trim() !== '') {
        whereCondition.genre = genre;
      }

      const authorInclude = {
        model: Author,
        attributes: ['id', 'name'],
        required: false, // Não quebra a query caso o autor não tenha livros vinculados
      };

      // Só aplica o filtro de ID do autor se ele for enviado e válido
      if (authorId && authorId.trim() !== '') {
        authorInclude.where = { id: authorId };
        authorInclude.required = true;
        // Aqui forçamos o INNER JOIN apenas se queremos os livros DELE
      }

      const books = await Book.findAll({
        where: whereCondition,
        attributes: ['id', 'title', 'pages', 'genre'],
        order: [['id', 'DESC']],
        limit,
        offset,
        include: [
          authorInclude,
          {
            model: BookCover,
            attributes: ['filename', 'url'], // Garante que o Sequelize monte a propriedade VIRTUAL 'url'
          },
        ],
      });

      return res.json(books);
    } catch (e) {
      console.error('Erro ao listar catálogo:', e);

      // Tratamento seguro para o .map() não quebrar o Node
      const errorMessages = e.errors
        ? e.errors.map((err) => err.message)
        : [e.message || 'Erro interno ao buscar livros'];

      return res.status(400).json({
        errors: errorMessages,
      });
    }
  }

  async store(req, res) {
    try {
      const newBook = await Book.create({
        ...req.body,
        user_id: req.userId,
      });

      const {
        id, title, pages, genre, author_id,
      } = newBook;

      return res.json({
        id, title, pages, genre, author_id,
      });
    } catch (e) {
      console.error('Erro original do banco:', e);
      const errorMessages = e.errors
        ? e.errors.map((err) => err.message)
        : [e.message || 'Erro interno ao cadastrar livro'];

      return res.status(400).json({
        errors: errorMessages,
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Id is required'],
        });
      }

      const book = await Book.findByPk(id);

      if (!book) {
        return res.status(400).json({
          errors: ['No book found'],
        });
      }

      if (book.user_id !== req.userId) {
        return res.status(401).json({
          errors: ['Você não tem permissão para editar um livro que não cadastrou.'],
        });
      }
      const bookAtualizado = await book.update(req.body);
      const {
        title, pages, genre, author_id,
      } = bookAtualizado;

      return res.json({
        title, pages, genre, author_id,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors ? e.errors.map((err) => err.message) : ['Update failed'],
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const book = await Book.findByPk(id, {
        attributes: ['id', 'title', 'pages', 'genre'],
        include: [
          {
            model: Author,
            attributes: ['id', 'name', 'nationality'],
          },
          {
            model: BookCover,
            attributes: ['url', 'filename', 'originalname'],
          },
        ],
      });

      if (!book) {
        return res.status(400).json({
          errors: ['Livro não encontrado'],
        });
      }

      return res.json(book);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors ? e.errors.map((err) => err.message) : ['Erro ao buscar o livro'],
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const book = await Book.findByPk(id);
      if (!book) {
        return res.status(400).json({
          errors: ['Book not found'],
        });
      }

      if (book.user_id !== req.userId) {
        return res.status(401).json({
          errors: ['Permissão negada para excluir este registro'],
        });
      }
      await book.destroy();
      return res.json({ apagado: true, id });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors ? e.errors.map((err) => err.message) : ['Erro ao deletar'],
      });
    }
  }
}

export default new BookController();
