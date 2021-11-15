import BancoDeDados from '../BancoDeDados';
import { DataTypes, Model, Optional } from 'sequelize';

interface TarefaAttributes {
  id_tarefa: number;
  id_projeto: number;
  id_colaborador: number | null;
  nome: string;
  descricao: string;
  concluida: boolean;
  observacao: string;
  createdAt?: Date;
}
export interface TarefaInput
  extends Optional<
    TarefaAttributes,
    'id_tarefa' | 'concluida' | 'observacao'
  > {}

class Tarefa extends Model<TarefaAttributes, TarefaInput> {
  public id_tarefa!: number;
  public id_projeto!: number;
  public id_colaborador!: number;
  public nome!: string;
  public descricao!: string;
  public concluida!: boolean;
  public observacao!: string;
  public readonly createdAt!: Date;

  public static Colaborador: any;
}

Tarefa.init(
  {
    id_tarefa: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_projeto: {
      type: DataTypes.INTEGER,
      references: { model: 'projetos', key: 'id_projeto' },
      allowNull: false,
    },
    id_colaborador: {
      type: DataTypes.INTEGER,
      references: { model: 'pessoas', key: 'id_pessoa' },
      allowNull: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    concluida: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    observacao: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    timestamps: true,
    sequelize: BancoDeDados.getInstance().getDbInstance(),
    modelName: 'tarefa',
  }
);

export default Tarefa;
