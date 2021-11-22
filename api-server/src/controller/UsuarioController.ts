import Usuario from '../model/Usuario';

export default class UsuarioController {
  constructor() {}

  static init() {
    Usuario.sync({ force: false });
  }
  static async registrarUsuario(
    alias: string,
    senha: string,
    id_pessoa: number
  ) {
    return Usuario.create({
      alias,
      senha: Usuario.getHashSenha(alias, senha),
      id_pessoa,
    });
  }

  static async getUsuarioAlias(alias: string, senha: string) {
    const usuario = await Usuario.findOne({
      where: {
        alias: alias,
        ativo: true,
      },
    });
    if (usuario === null || !(await usuario.validateSenha(senha))) return null;
    return usuario;
  }
}
