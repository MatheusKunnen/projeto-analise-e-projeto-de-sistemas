import Pessoa from '../model/Pessoa';

export default class PessoaController {
  constructor() {}

  static init() {
    Pessoa.sync({ force: true });
  }

  static async registrarPessoa(nome: string, sobrenome: string, email: string) {
    return Pessoa.create({ nome, sobrenome, email });
  }
}
