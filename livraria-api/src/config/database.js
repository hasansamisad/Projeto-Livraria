require('dotenv').config();

// Verifica se estamos conectando a um banco remoto (como o Render) para exigir SSL
const useSSL = process.env.DATABASE_HOST && !['localhost', '127.0.0.1', 'database'].includes(process.env.DATABASE_HOST);

module.exports = {
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,

  dialectOptions: useSSL ? {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Evita erros de certificado autoassinado no Render
    },
  } : {},

  define: {
    timestamps: true,
    /* Garante que tabelas e colunas usem snake_case (ex: user_id), essencial no Postgres */
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at', // Ajustado sutilmente o camelCase do Sequelize aqui para evitar conflitos nativos
  },
  /* O PostgreSQL gerencia fuso horário de forma diferente do MySQL,
     geralmente definimos apenas o timezone global */
  timezone: 'America/Sao_Paulo',
};
