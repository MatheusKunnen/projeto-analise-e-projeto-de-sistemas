import Pessoa from '../model/Pessoa';
import Projeto from '../model/Projeto';

export default class ProjetoController {
  constructor() {}

  static init() {
    Projeto.sync();
    Projeto.build();
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
      include: [Projeto.Colaborador, Projeto.Tarefa],
    });
  }

  static async atualizarColaboradoresProjeto(
    gerenciador: number,
    id_projeto: number,
    colaboradores: number[]
  ) {
    console.log(colaboradores);
    let projeto = await Projeto.findOne({ where: { id_projeto, gerenciador } });
    if (projeto === null) return null;
    //@ts-ignore
    await projeto.addColaboradores(colaboradores);
    return ProjetoController.getProjetoByID(gerenciador, id_projeto);
  }
}
