import express, { Request, Response } from 'express';
import Router from './Router';
import PessoaController from '../controller/PessoaController';
import asyncHandler from '../middleware/asyncHandler';

export default class UsuarioRouter extends Router {
  constructor(app: express.Application) {
    super(app);
  }

  initRouter(): void {
    // Inicia controlador
    PessoaController.init();
    // Inicia rutas
    const router = express.Router();
    this.app.use('/pessoa', router);
  }
}
