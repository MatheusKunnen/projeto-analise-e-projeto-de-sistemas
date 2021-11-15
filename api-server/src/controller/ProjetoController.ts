import BancoDeDados from '../BancoDeDados';
import ColaboradorProjeto from '../model/ColaboradorProjeto';
import Pessoa from '../model/Pessoa';
import Projeto from '../model/Projeto';

export default class ProjetoController {
  constructor() {}

  static init() {
    Projeto.sync({ force: false });
    ColaboradorProjeto.sync({ force: false });
  }

  static async criarProjeto(
    nome: string,
    descricao: string,
    gerenciador: number
  ) {
    const transaction = await BancoDeDados.getInstance()
      .getDbInstance()
      .transaction();
    try {
      const projeto = await Projeto.create(
        { nome, descricao, gerenciador },
        { transaction, include: [Projeto.Tarefa] }
      );
      await ColaboradorProjeto.create(
        {
          id_projeto: projeto.id_projeto,
          id_pessoa: projeto.gerenciador,
        },
        { transaction }
      );
      await transaction.commit();
      return projeto;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  static async getProjetos(id_pessoa?: number) {
    const where = typeof id_pessoa === 'undefined' ? {} : { id_pessoa };
    const id_projetos = await ColaboradorProjeto.findAll({
      where,
      attributes: ['id_projeto'],
    });

    if (id_projetos === null) return [];

    const projetos = await Promise.all(
      id_projetos.map(({ id_projeto }) =>
        Projeto.findOne({ where: { id_projeto } })
      )
    );
    return projetos.filter((projeto) => projeto !== null);
  }
  static async getProjetoByID(id_projeto: number) {
    return Projeto.findOne({
      where: { id_projeto },
      include: [Projeto.Tarefa],
    });
  }

  static async adicionarColaboradorProjeto(
    id_projeto: number,
    colaborador: number
  ) {
    let projeto = await Projeto.findOne({ where: { id_projeto } });
    if (projeto === null) return null;
    await ColaboradorProjeto.create({ id_projeto, id_pessoa: colaborador });
    return ProjetoController.getProjetoByID(id_projeto);
  }

  static async getColaboradoresProjeto(id_projeto: number) {
    const colaboradores_id = await ColaboradorProjeto.findAll({
      where: { id_projeto },
    });

    const colaboradores = await Promise.all(
      colaboradores_id.map(async ({ id_pessoa }) =>
        Pessoa.findOne({ where: { id_pessoa } })
      )
    );

    return colaboradores
      .filter((c) => c !== null)
      .map((colaborador) => colaborador!.get());
  }
}
