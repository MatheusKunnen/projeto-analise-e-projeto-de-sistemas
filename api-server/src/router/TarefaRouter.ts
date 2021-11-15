import express, { Request, Response } from 'express';
import Router from './Router';
import TarefaController from '../controller/TarefaController';
import asyncHandler from '../middleware/asyncHandler';
import UsuarioController from '../controller/UsuarioController';
import UsuarioRouter from './UsuarioRouter';
import ProjetoController from '../controller/ProjetoController';

export default class TarefaRouter extends Router {
  constructor(app: express.Application) {
    super(app);
  }

  initRouter(): void {
    // Inicia controlador
    TarefaController.init();
    // Inicia rutas
    const router = express.Router();
    router
      .route('/')
      .post(
        asyncHandler(UsuarioRouter.checkLogin),
        asyncHandler(TarefaRouter.criarTarefa)
      )
      .get(
        asyncHandler(UsuarioRouter.checkLogin),
        asyncHandler(TarefaRouter.getTarefasAssociadas)
      );
    router.get(
      '/:id_tarefa',
      asyncHandler(UsuarioRouter.checkLogin),
      asyncHandler(TarefaRouter.getTarefaById)
    );
    router.put(
      '/:id_tarefa/colaborador/:id_pessoa',
      asyncHandler(UsuarioRouter.checkLogin),
      asyncHandler(TarefaRouter.adicionarColaboradorTarefa)
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

  static async getTarefasAssociadas(req: Request, res: Response) {
    // @ts-ignore
    const id_pessoa: number = req.usuario.id_pessoa;

    const tarefa = await TarefaController.getTarefasPessoa(id_pessoa);

    return res.status(200).json({ data: tarefa });
  }

  static async getTarefaById(req: Request, res: Response) {
    const id_tarefa = req.params.id_tarefa;
    // @ts-ignore
    const id_pessoa = req.usuario.id_pessoa;
    if (typeof id_tarefa === 'undefined')
      return res.status(400).json('ID inválido');

    const tarefa = await TarefaController.getTarefaById(Number(id_tarefa));

    if (tarefa === null)
      return res
        .status(404)
        .json({ error: `Tarefa ${id_tarefa} não encontrada` });

    if (tarefa.id_colaborador !== id_pessoa) {
      const projeto = await ProjetoController.getProjetoByID(
        id_pessoa,
        tarefa.id_projeto
      );
      if (!projeto || projeto.gerenciador !== id_pessoa) {
        return res.status(403).json();
      }
    }

    return res.status(200).json({ data: tarefa.get() });
  }

  static async adicionarColaboradorTarefa(req: Request, res: Response) {
    return res.status(500).json();
  }
}
