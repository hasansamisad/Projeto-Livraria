module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('book_covers', [
      {
        originalname: 'capa_dom_casmurro.webp',
        filename: 'seed_dom_casmurro.webp', // Este arquivo deve existir na pasta física para o link funcionar
        book_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        originalname: 'capa_1984.webp',
        filename: 'seed_1984.webp',
        book_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: (queryInterface) => queryInterface.bulkDelete('book_covers', null, {}),
};
