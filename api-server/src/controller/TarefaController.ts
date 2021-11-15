import BancoDeDados from '../BancoDeDados';
import Projeto from '../model/Projeto';
import Tarefa from '../model/Tarefa';

export default class TarefaController {
  constructor() {}

  static init() {
    Tarefa.sync();
    Tarefa.build();
  }

  static async criarTarefa(
    id_projeto: number,
    nome: string,
    descricao: string,
    id_colaborador: number | null
  ) {
    const transaction = await BancoDeDados.getInstance()
      .getDbInstance()
      .transaction();
    try {
      const ltarefa = await Tarefa.create(
        { id_projeto, nome, descricao, id_colaborador },
        { transaction }
      );

      const projeto = await Projeto.findOne({ where: { id_projeto } });
      // @ts-ignore
      projeto.addTarefa(ltarefa.id_tarefa);
      await transaction.commit();
      return ltarefa;
    } catch (err) {
      console.error(err);
      await transaction.rollback();
    }
    return null;
  }
}
