import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class BookCover extends Model {
  static init(sequelize) {
    super.init({
      originalname: { type: Sequelize.STRING },
      filename: { type: Sequelize.STRING },
      // Campo virtual para acessar a imagem via URL
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue('filename')}`;
        },
      },
    }, {
      sequelize,
      tableName: 'book_covers',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Book, { foreignKey: 'book_id' }); // Pertence a um livro
  }
}
