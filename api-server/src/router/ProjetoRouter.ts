import express, { Request, Response } from 'express';
import Router from './Router';
import ProjetoController from '../controller/ProjetoController';
import UsuarioRouter from './UsuarioRouter';
import asyncHandler from '../middleware/asyncHandler';

export default class ProjetoRouter extends Router {
  constructor(app: express.Application) {
    super(app);
  }

  initRouter(): void {
    // Inicia controlador
    ProjetoController.init();
    // Inicia rutas
    const router = express.Router();
    router.post(
      '/',
      UsuarioRouter.checkLogin,
      asyncHandler(ProjetoRouter.criarProjeto)
    );
    this.app.use('/projeto', router);
  }

  static async criarProjeto(req: Request, res: Response) {
    // Valida campos requeridos
    const fields = ['nome', 'descricao'];
    const body = req.body;
    if (typeof body === 'undefined')
      return res.status(400).json({ error: `Valores inválidos` });
    let ok = true;
    fields.forEach((key) => {
      if (ok && typeof body[key] === 'undefined') {
        ok = false;
        res.status(400).json({ error: `${key} inválido` });
      }
    });
    if (!ok) return;

    const projeto = await ProjetoController.criarProjeto(
      body.nome,
      body.descricao,
      req.usuario!.id_pessoa
    );

    if (projeto === null)
      return res
        .status(400)
        .json({ error: 'Ocorreu um erro ao criar o projeto.' });
    return res.status(201).json({ data: projeto.get() });
  }
}
