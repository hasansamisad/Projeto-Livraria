import jwt from 'jsonwebtoken';
import User from '../models/Users';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais invalidas'],
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Credenciais invalidas'],
      });
    }

    const { id, name } = user;

    const token = jwt.sign(
      { id, email },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION },
    );
    return res.json({
      token,
      user: { id, name, email },
    });
  }
}

export default new TokenController();
