import express from 'express';
import morgan from 'morgan';
import UsuarioRouter from './router/UsuarioRouter';
import BancoDeDados from './BancoDeDados';

export default class Main {
  app: express.Application;
  db: BancoDeDados;

  port = 5000;

  constructor() {
    // Inicia App Express
    this.app = express();
    this.app.use(morgan('dev'));
    // Inicia Banco de Dados
    this.db = BancoDeDados.getInstance(process.env.DB_STORAGE || './db.sqlite');
    // Inicia Rutas
    Main.getDefaultRoutes().forEach((ruta) => {
      const rute = new ruta(this.app);
      rute.initRouter();
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Running localhost:${this.port}`);
    });
  }

  static getDefaultRoutes() {
    return [UsuarioRouter];
  }
}
