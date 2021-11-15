import Tarefa from '../model/Tarefa';

export default class TarefaController {
  constructor() {}

  static init() {
    Tarefa.sync();
    Tarefa.build();
  }
}
