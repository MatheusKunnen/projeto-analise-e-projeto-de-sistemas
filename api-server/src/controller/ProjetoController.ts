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
}
