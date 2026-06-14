module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adiciona a coluna release_year na tabela books
    await queryInterface.addColumn('books', 'release_year', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    // Caso precise reverter a migration
    await queryInterface.removeColumn('books', 'release_year');
  },
};
