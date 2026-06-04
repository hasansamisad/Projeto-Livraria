require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  define: {
    timestamps: true,
    /* Garante que tabelas e colunas usem snake_case (ex: user_id), essencial no Postgres */
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updated_at: 'updated_at',
  },
  /* O PostgreSQL gerencia fuso horário de forma diferente do MySQL,
     geralmente definimos apenas o timezone global */
  timezone: 'America/Sao_Paulo',
};
