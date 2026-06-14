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
      synopsis: {
        type: Sequelize.TEXT,
        defaultValue: '',
      },
      release_year: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          isInt: { msg: 'Ano de lançamento deve ser um número inteiro.' },
        },
      },
    }, {
      sequelize,
      tableName: 'books',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Author, { foreignKey: 'author_id' });
    this.hasMany(models.BookCover, { foreignKey: 'book_id' });
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}
