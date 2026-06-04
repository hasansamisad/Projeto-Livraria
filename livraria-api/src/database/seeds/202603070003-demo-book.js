module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('books', [
      {
        id: 1,
        title: 'Dom Casmurro',
        pages: 256,
        genre: 'Romance',
        author_id: 1, // Machado de Assis
        user_id: 1, // Seu admin logado
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        title: '1984',
        pages: 328,
        genre: 'Distopia',
        author_id: 2, // George Orwell
        user_id: 2, // Seu admin logado
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: (queryInterface) => queryInterface.bulkDelete('books', null, {}),
};
