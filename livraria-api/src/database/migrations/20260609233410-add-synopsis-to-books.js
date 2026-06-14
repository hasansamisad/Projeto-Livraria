module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('books', 'synopsis', {
      type: Sequelize.TEXT,
      allowNull: true, // Permite nulo para não quebrar os livros antigos que não possuem sinopse
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('books', 'synopsis');
  },
};
