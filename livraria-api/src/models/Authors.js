import Sequelize, { Model } from 'sequelize';

export default class Author extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 100],
              msg: 'Campo nome deve ter entre 3 a 100 caracteres',
            },
          },
        },
        nationality: {
          type: Sequelize.STRING,
          defaultValue: 'Nacionalidade não especificada',
          validate: {
            len: {
              args: [3, 30],
              msg: 'O campo nacionalidade deve ter entre 3 a 30 caracteres',
            },
          },
        },
        birth_date: {
          type: Sequelize.DATEONLY,
          validate: {
            isDate: {
              msg: 'Data de nascimento inválida. Use o formato AAAA-MM-DD',
            },
            isBefore: {
              args: new Date().toISOString().split('T')[0],
              msg: 'A data de nascimento não pode ser no futuro',
            },
          },
        },
      },
      {
        sequelize,
        tableName: 'authors',
      },
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Book, { foreignKey: 'author_id' });
  }
}
