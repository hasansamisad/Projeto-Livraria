import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './database';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import homeRoutes from './routes/homeRoute';
import authorRoutes from './routes/authorRoutes';
import bookRoutes from './routes/bookRoutes';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import bookCoverRoutes from './routes/bookCouverRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' }, // Permite carregar as imagens no front!
    }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());

    // CONFIGURAÇÃO DOS ARQUIVOS ESTÁTICOS
    // Isso diz ao Express: "Se alguém pedir /images/, procure o arquivo dentro de uploads/images"
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/authors', authorRoutes);
    this.app.use('/books', bookRoutes);
    this.app.use('/user', userRoutes);
    this.app.use('/token', tokenRoutes);
    this.app.use('/covers', bookCoverRoutes);
  }
}

export default new App().app;
