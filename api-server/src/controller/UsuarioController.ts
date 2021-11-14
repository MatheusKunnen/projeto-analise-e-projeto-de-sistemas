import Usuario from '../model/Usuario';

export default class UsuarioController {
  constructor() {}

  static init() {
    Usuario.sync();
  }
  static async getUsuarios() {
    return { hola: true };
  }
}
