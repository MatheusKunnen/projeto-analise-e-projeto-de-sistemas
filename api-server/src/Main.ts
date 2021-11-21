import express from 'express';
import morgan from 'morgan';
import PessoaRouter from './router/PessoaRouter';
import ProjetoRouter from './router/ProjetoRouter';
import TarefaRouter from './router/TarefaRouter';
import UsuarioRouter from './router/UsuarioRouter';
import BancoDeDados from './BancoDeDados';
import cors from 'cors';
export default class Main {
  app: express.Application;
  db: BancoDeDados;

  port = 5000;

  constructor() {
    // Inicia App Express
    this.app = express();
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    // Inicia Banco de Dados
    this.db = BancoDeDados.getInstance(process.env.DB_STORAGE || './db.sqlite');
    // Inicia Rutas
    Main.getDefaultRoutes().forEach((ruta) => {
      const rute = new ruta(this.app);
      rute.initRouter();
    });
    // Adicionar gerenciador de erros não tratados
    this.app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: Function
      ) => {
        //console.log(err.name);
        if (err.name === 'SequelizeUniqueConstraintError') {
          return res.status(400).json({ error: 'Objeto já existente' });
        } else if (err.name === 'SyntaxError') {
          return res.status(400).json({ error: 'Formato inválido' });
        } else {
          console.error(err);
          return res.status(500).json({});
        }
      }
    );
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Running localhost:${this.port}`);
    });
  }

  static getDefaultRoutes() {
    return [PessoaRouter, ProjetoRouter, TarefaRouter, UsuarioRouter];
  }
}
