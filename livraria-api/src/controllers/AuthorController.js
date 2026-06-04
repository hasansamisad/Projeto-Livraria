import Author from '../models/Authors';
import Book from '../models/Books';
import BookCover from '../models/BookCover';

class AuthorController {
  async index(req, res) {
    try {
      const authors = await Author.findAll({
        attributes: ['id', 'name', 'nationality', 'birth_date'],
        order: [['id', 'DESC']],
      });

      if (authors.length === 0) {
        return res.status(404).json({
          errors: ['There are no authors registered yet'],
        });
      }

      return res.json(authors);
    } catch (e) {
      if (e.errors) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }

      return res.status(500).json({
        errors: [e.message || 'Internal Server Error'],
      });
    }
  }

  async store(req, res) {
    try {
      const newAuthor = await Author.create(req.body);
      const {
        id, name, nationality, birth_date,
      } = newAuthor;

      return res.json({
        id, name, nationality, birth_date,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Id required'],
        });
      }

      const author = await Author.findByPk(id);
      if (!author) {
        return res.status(400).json({
          errors: ['Author not found'],
        });
      }

      const updatedAuthor = await author.update(req.body);
      const { name, nationality, birth_date } = updatedAuthor;

      return res.json({ name, nationality, birth_date });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const author = await Author.findByPk(req.params.id, {
        attributes: ['id', 'name', 'nationality', 'birth_date'],
        include: {
          model: Book,
          attributes: ['id', 'title', 'pages'],
          include: {
            model: BookCover,
            attributes: ['url', 'filename'], // Traz a URL virtual da capa
          },
        },
        order: [[Book, 'id', 'DESC']],
      });

      if (!author) {
        return res.status(400).json({
          errors: ['Author not found'],
        });
      }

      return res.json(author);
    } catch (e) {
      return e.errors.map((err) => err.message);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const author = await Author.findByPk(id);

      if (!author) {
        return res.status(400).json({
          errors: ['This author does not exist'],
        });
      }

      const livrosVinculados = await Book.findOne({ where: { author_id: id } });

      if (livrosVinculados) {
        return res.status(400).json({
          errors: ['Cannot delete author with linked books. Please remove or reassign those books first.'],
        });
      }
      await author.destroy();
      return res.json({ apagado: true });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new AuthorController();
