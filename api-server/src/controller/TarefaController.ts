import BancoDeDados from '../BancoDeDados';
import Projeto from '../model/Projeto';
import Tarefa from '../model/Tarefa';

export default class TarefaController {
  constructor() {}

  static init() {
    Tarefa.sync({ force: false });
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
      if (typeof id_colaborador === 'undefined') id_colaborador = null;
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
      await transaction.rollback();
      throw err;
    }
  }

  static async getTarefasPessoa(id_colaborador: number) {
    return Tarefa.findAll({
      where: { id_colaborador },
    });
  }

  static async getTarefaById(id_tarefa: number) {
    return Tarefa.findOne({
      where: { id_tarefa },
    });
  }

  static async setColaboradorTarefa(
    id_tarefa: number,
    id_colaborador: number | null
  ) {
    const [rows, ...reg] = await Tarefa.update(
      { id_colaborador },
      { where: { id_tarefa } }
    );

    return rows;
  }

  static async updateTarefa(
    id_tarefa: number,
    id_colaborador?: number,
    nome?: string,
    descricao?: string,
    concluida?: boolean,
    observacao?: string
  ) {
    const [rows, ...r] = await Tarefa.update(
      { id_tarefa, id_colaborador, nome, descricao, concluida, observacao },
      { where: { id_tarefa } }
    );
    return rows;
  }
}
