import BancoDeDados from '../BancoDeDados';
import { DataTypes, Model, Optional } from 'sequelize';

interface TarefaAttributes {
  id_tarefa: number;
  nome: string;
  sobrenome: string;
  email: string;
  createdAt?: Date;
}
export interface TarefaInput extends Optional<TarefaAttributes, 'id_tarefa'> {}

class Tarefa extends Model<TarefaAttributes, TarefaInput> {
  public id_tarefa!: number;
  public nome!: string;
  public sosbrenome!: string;
  public email!: string;
  public readonly createdAt!: Date;
}

Tarefa.init(
  {
    id_tarefa: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sobrenome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    sequelize: BancoDeDados.getInstance().getDbInstance(),
    modelName: 'tarefa',
  }
);

export default Tarefa;
