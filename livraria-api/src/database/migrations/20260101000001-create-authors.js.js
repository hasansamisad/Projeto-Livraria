module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('authors', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nationality: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Nacionalidade não especificada',
    },
    birth_date: {
      type: Sequelize.DATE,
      allowNull: false,
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

  down: (queryInterface) => queryInterface.dropTable('authors'),
};
