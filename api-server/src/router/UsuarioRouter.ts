import express, { Request, Response } from 'express';
import Router from './Router';
import UsuarioController from '../controller/UsuarioController';

export default class UsuarioRouter extends Router {
  constructor(app: express.Application) {
    super(app);
  }

  initRouter(): void {
    // Inicia controlador
    UsuarioController.init();
    // Inicia rutas
    const router = express.Router();
    router.get('/:id', UsuarioRouter.checkLogin, UsuarioRouter.getById);
    this.app.use('/usuario', router);
  }

  static async getById(req: Request, res: Response) {
    res.status(200).json({ data: UsuarioController.getUsuarios() });
  }

  static async checkLogin(req: Request, res: Response, next: Function) {
    //if (typeof req.header.Authorization === 'undefined') {
    //}
    next();
  }
}
