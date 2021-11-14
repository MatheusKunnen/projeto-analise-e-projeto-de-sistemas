import BancoDeDados from '../BancoDeDados';
import { DataTypes, Model, Optional } from 'sequelize';

interface UsuarioAttributes {
  id_usuario: number;
  alias: string;
  senha: string;
  ativo: boolean;
  createdAt?: Date;
}
export interface UsuarioInput
  extends Optional<UsuarioAttributes, 'id_usuario' | 'ativo'> {}
// export interface UsuariotOuput extends Required<UsuarioAttributes> {}

class Usuario extends Model<UsuarioAttributes, UsuarioInput> {
  public id_usuario!: number;
  public alias!: string;
  public senha!: string;
  public ativo!: boolean;
  public readonly createdAt!: Date;
}

Usuario.init(
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    sequelize: BancoDeDados.getInstance().getDbInstance(),
  }
);

export default Usuario;
