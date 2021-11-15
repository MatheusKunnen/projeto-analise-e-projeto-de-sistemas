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
    router.get(
      '/:id_projeto',
      UsuarioRouter.checkLogin,
      asyncHandler(ProjetoRouter.getProjetoById)
    );
    router.put(
      '/:id_projeto/add_colaborador/:id_pessoa',
      UsuarioRouter.checkLogin,
      asyncHandler(ProjetoRouter.adicionarColaborador)
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
      // @ts-ignore
      req.usuario!.id_pessoa
    );

    if (projeto === null)
      return res
        .status(400)
        .json({ error: 'Ocorreu um erro ao criar o projeto.' });
    return res.status(201).json({ data: projeto.get() });
  }

  static async getProjetoById(req: Request, res: Response) {
    const id_projeto = req.params.id_projeto;
    if (typeof id_projeto === 'undefined')
      return res.status(400).json('ID inválido');

    const projeto = await ProjetoController.getProjetoByID(
      // @ts-ignore
      req.usuario!.id_usuario,
      Number(id_projeto)
    );

    if (projeto === null)
      return res
        .status(404)
        .json({ error: `Projeto ${id_projeto} não encontrado` });
    return res.status(200).json({ data: projeto.get() });
  }
  static async adicionarColaborador(req: Request, res: Response) {
    const id_projeto = req.params.id_projeto;
    const id_pessoa = req.params.id_pessoa;
    if (typeof id_projeto === 'undefined' || typeof id_pessoa === 'undefined')
      return res.status(400).json('ID inválido');

    let projeto = await ProjetoController.getProjetoByID(
      // @ts-ignore
      req.usuario!.id_usuario,
      Number(id_projeto)
    );

    if (projeto === null)
      return res
        .status(404)
        .json({ error: `Projeto ${id_projeto} não encontrado` });

    let projeto2 = await ProjetoController.atualizarColaboradoresProjeto(
      // @ts-ignore
      req.usuario!.id_usuario,
      Number(id_projeto),
      [Number(id_pessoa)]
    );
    if (projeto2 === null) return res.status(500).json();
    return res.status(200).json({ data: projeto2 });
  }
}
