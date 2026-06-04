module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('books', {

    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pages: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    genre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'authors', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users', // Nome da tabela de destino
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // Se o usuário for deletado, o livro continua lá mas sem dono
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('books'),
};
