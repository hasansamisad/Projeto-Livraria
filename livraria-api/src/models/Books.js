import Sequelize, { Model } from 'sequelize';

export default class Book extends Model {
  static init(sequelize) {
    super.init({
      title: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: { args: [3, 255], msg: 'Título deve ter entre 3 e 255 caracteres.' },
        },
      },
      pages: {
        type: Sequelize.INTEGER,
        validate: { isInt: { msg: 'Páginas deve ser um número inteiro.' } },
      },
      genre: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
    }, {
      sequelize,
      tableName: 'books',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Author, { foreignKey: 'author_id' }); // Relacionamento com Autor
    this.hasMany(models.BookCover, { foreignKey: 'book_id' }); // Um livro pode ter capas
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}
