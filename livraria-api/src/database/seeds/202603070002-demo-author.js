module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('authors', [
      {
        id: 1,
        name: 'Machado de Assis',
        nationality: 'Brasileiro',
        birth_date: new Date('1839-06-21'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'George Orwell',
        nationality: 'Britânico',
        birth_date: new Date('1903-06-25'),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: (queryInterface) => queryInterface.bulkDelete('authors', null, {}),
};
