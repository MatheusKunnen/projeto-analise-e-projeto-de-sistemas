import express, { Request, Response } from 'express';
import Router from './Router';
import TarefaController from '../controller/TarefaController';
import asyncHandler from '../middleware/asyncHandler';

export default class TarefaRouter extends Router {
  constructor(app: express.Application) {
    super(app);
  }

  initRouter(): void {
    // Inicia controlador
    TarefaController.init();
    // Inicia rutas
    const router = express.Router();
    this.app.use('/projeto', router);
  }
}
