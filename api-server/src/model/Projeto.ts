import BancoDeDados from '../BancoDeDados';
import { DataTypes, Model, Optional } from 'sequelize';
import Pessoa from './Pessoa';
import Tarefa from './Tarefa';

interface ProjetoAttributes {
  id_projeto: number;
  nome: string;
  descricao: string;
  gerenciador: number;
  concluido: boolean;
  createdAt?: Date;
}
export interface ProjetoInput
  extends Optional<ProjetoAttributes, 'id_projeto' | 'concluido'> {}

class Projeto extends Model<ProjetoAttributes, ProjetoInput> {
  public id_projeto!: number;
  public nome!: string;
  public descrição!: string;
  public gerenciador!: number;
  public concluido!: boolean;

  public readonly createdAt!: Date;
  static Colaborador: any;
  static Tarefa: any;
}

Projeto.init(
  {
    id_projeto: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gerenciador: {
      type: DataTypes.NUMBER,
      references: { model: 'pessoas', key: 'id_pessoa' },
      allowNull: false,
    },
    concluido: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    sequelize: BancoDeDados.getInstance().getDbInstance(),
    modelName: 'projeto',
  }
);
Projeto.Colaborador = Projeto.hasMany(Pessoa, { as: 'colaboradores' });
Projeto.Tarefa = Projeto.hasMany(Tarefa, { as: 'tarefas' });
export default Projeto;
