import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Author from '../models/Authors';
import Book from '../models/Books';
import BookCover from '../models/BookCover';
import User from '../models/Users';

const models = [User, Author, Book, BookCover];

const connection = new Sequelize(databaseConfig);

// Primeiro inicializa as tabelas e guarda na memoria do Sequelize
models.forEach((model) => model.init(connection));

// Agora todos estão guardados dentro de connection.models
// E o código consegue associar quem tem vinculo com quem
models.forEach((model) => model.associate && model.associate(connection.models));
