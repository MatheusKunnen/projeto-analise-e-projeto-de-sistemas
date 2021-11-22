import express, { Request, Response } from 'express';
import Router from './Router';
import PessoaController from '../controller/PessoaController';
import asyncHandler from '../middleware/asyncHandler';
import UsuarioRouter from './UsuarioRouter';

export default class PessoaRouter extends Router {
  constructor(app: express.Application) {
    super(app);
  }

  initRouter(): void {
    // Inicia controlador
    PessoaController.init();
    // Inicia rutas
    const router = express.Router();
    router
      .route('/')
      .get(
        asyncHandler(UsuarioRouter.checkLogin),
        asyncHandler(PessoaRouter.getPessoas)
      );
    router
      .route('/:id_pessoa')
      .get(
        asyncHandler(UsuarioRouter.checkLogin),
        asyncHandler(PessoaRouter.getPessoasPessoasById)
      );
    this.app.use('/pessoa', router);
  }

  static async getPessoas(req: Request, res: Response) {
    const pessoas = await PessoaController.getPessoas();
    return res.status(200).json({ data: pessoas });
  }

  static async getPessoasPessoasById(req: Request, res: Response) {
    const id_pessoa = req.params.id_pessoa;
    if (typeof id_pessoa === 'undefined')
      return res.status(400).json({ error: 'ID inválido' });

    const pessoa = await PessoaController.getPessoaPorId(Number(id_pessoa));
    if (pessoa === null)
      return res
        .status(404)
        .json({ error: `Pessoa ${id_pessoa} não encontrada` });
    return res.status(200).json({ data: pessoa });
  }
}
