import express, { Request, Response } from 'express';
import Router from './Router';
import TarefaController from '../controller/TarefaController';
import asyncHandler from '../middleware/asyncHandler';
import UsuarioController from '../controller/UsuarioController';
import UsuarioRouter from './UsuarioRouter';

export default class TarefaRouter extends Router {
  constructor(app: express.Application) {
    super(app);
  }

  initRouter(): void {
    // Inicia controlador
    TarefaController.init();
    // Inicia rutas
    const router = express.Router();
    router.post(
      '/',
      asyncHandler(UsuarioRouter.checkLogin),
      asyncHandler(TarefaRouter.criarTarefa)
    );
    this.app.use('/tarefa', router);
  }

  static async criarTarefa(req: Request, res: Response) {
    // Valida campos requeridos
    const fields = ['id_projeto', 'nome', 'descricao'];
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

    const projeto = await TarefaController.criarTarefa(
      body.id_projeto,
      body.nome,
      body.descricao,
      body.id_colaborador ? body.id_colaborador : null
    );

    if (projeto === null)
      return res
        .status(400)
        .json({ error: 'Ocorreu um erro ao criar a tarefa.' });
    return res.status(201).json({ data: projeto.get() });
  }
}
