import BancoDeDados from '../BancoDeDados';
import { DataTypes, Model, Optional } from 'sequelize';

interface PessoaAttributes {
  id_pessoa: number;
  nome: string;
  sobrenome: string;
  email: string;
  createdAt?: Date;
}
export interface PessoaInput extends Optional<PessoaAttributes, 'id_pessoa'> {}

class Pessoa extends Model<PessoaAttributes, PessoaInput> {
  public id_pessoa!: number;
  public nome!: string;
  public sosbrenome!: string;
  public email!: string;
  public readonly createdAt!: Date;
}

Pessoa.init(
  {
    id_pessoa: {
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
    modelName: 'pessoa',
  }
);

export default Pessoa;
