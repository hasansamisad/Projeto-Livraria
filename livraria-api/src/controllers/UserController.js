import User from '../models/Users';

class UserController {
  async show(req, res) {
    try {
      const user = await User.findByPk(req.userId, {
        attributes: ['id', 'name', 'email'],
      });
      if (!user) {
        return res.status(404).json({ errors: ['Usuário não encontrado.'] });
      }
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ errors: 'Erro interno ao buscar o perfil' });
    }
  }

  async store(req, res) {
    try {
      const { name, email, password } = req.body;
      const newUser = await User.create({ name, email, password });

      const { id } = newUser;
      return res.json({ id, name, email });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors ? e.errors.map((err) => err.message) : ['Ocorreu um erro inesperado.'],
      });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({ errors: ['Usuário não encontrado.'] });
      }

      const userAtualizado = await user.update(req.body);
      const { id, name, email } = userAtualizado;

      return res.json({ id, name, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors ? e.errors.map((err) => err.message) : ['Ocorreu um erro inesperado.'],
      });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({ errors: ['Usuário não encontrado.'] });
      }

      await user.destroy();
      return res.json({ msg: 'Sua conta foi excluida com sucesso' });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors ? e.errors.map((err) => err.message) : ['Ocorreu um erro inesperado.'],
      });
    }
  }
}

export default new UserController();
