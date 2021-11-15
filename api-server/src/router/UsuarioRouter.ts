import express, { Request, Response } from 'express';
import Router from './Router';
import UsuarioController from '../controller/UsuarioController';
import PessoaController from '../controller/PessoaController';
import asyncHandler from '../middleware/asyncHandler';

export default class UsuarioRouter extends Router {
  constructor(app: express.Application) {
    super(app);
  }

  initRouter(): void {
    // Inicia controlador
    UsuarioController.init();
    // Inicia rutas
    const router = express.Router();
    router.post('/', asyncHandler(UsuarioRouter.registrarUsuario));
    router.get(
      '/me',
      UsuarioRouter.checkLogin,
      asyncHandler(UsuarioRouter.getMe)
    );
    this.app.use('/usuario', router);
  }

  static async registrarUsuario(req: Request, res: Response) {
    // Verificação de valores requeridos
    const fields = ['alias', 'senha', 'nome', 'sobrenome', 'email'];
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
    // Cria a pessoa associada ao usuario
    const pessoa = await PessoaController.registrarPessoa(
      body.nome,
      body.sobrenome,
      body.email
    );
    // Verifica que a pessoa foi criada corretamente
    if (pessoa === null) {
      console.error(
        'ERROR::UsuarioRouter::registrarUsuario:: não foi possível criar a pessoa associada ao usuario'
      );
      res.status(500);
    }
    // Cria o usuario
    const usuario = await UsuarioController.registrarUsuario(
      body.alias,
      body.senha,
      pessoa.id_pessoa
    );
    if (usuario === null) {
      console.error(
        'ERROR::UsuarioRouter::registrarUsuario:: não foi possível registrar o usuario'
      );
      res.status(500);
    }
    return res.status(201).json({ ...usuario.get(), pessoa, senha: undefined });
  }

  static async getMe(req: Request, res: Response) {
    if (typeof req.usuario !== 'undefined') {
      return res
        .status(200)
        .json({ data: { ...req.usuario.get(), senha: undefined } });
    } else {
      return res.status(404).json();
    }
  }

  static async checkLogin(req: Request, res: Response, next: Function) {
    // Verifica se existe o header
    if (typeof req.headers.authorization === 'undefined') {
      return res.status(401).json();
    }
    // Valida autenticação Basic
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [alias, senha] = Buffer.from(b64auth, 'base64').toString().split(':');
    // Valida alias e senha com o banco de dados
    const usuario = await UsuarioController.getUsuarioAlias(alias, senha);
    if (usuario === null) return res.status(401);
    req.usuario! = usuario;
    next();
  }
}
