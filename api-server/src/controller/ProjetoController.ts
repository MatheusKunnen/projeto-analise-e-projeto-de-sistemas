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
    return Projeto.create({ nome, descricao, gerenciador });
  }

  static async getProjetoByID(gerenciador: number, id_projeto: number) {
    return Projeto.findOne({
      where: { id_projeto },
      include: [Projeto.Tarefa],
    });
  }

  static async adicionarColaboradorProjeto(
    gerenciador: number,
    id_projeto: number,
    colaborador: number
  ) {
    let projeto = await Projeto.findOne({ where: { id_projeto, gerenciador } });
    if (projeto === null) return null;
    await ColaboradorProjeto.create({ id_projeto, id_pessoa: colaborador });
    return ProjetoController.getProjetoByID(gerenciador, id_projeto);
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
