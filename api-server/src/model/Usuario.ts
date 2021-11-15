import BancoDeDados from '../BancoDeDados';
import { DataTypes, Model, Optional } from 'sequelize';
import { createHash } from 'crypto';

interface UsuarioAttributes {
  id_usuario: number;
  alias: string;
  senha: string;
  ativo: boolean;
  id_pessoa: number;
  createdAt?: Date;
}
export interface UsuarioInput
  extends Optional<UsuarioAttributes, 'id_usuario' | 'ativo'> {}

class Usuario extends Model<UsuarioAttributes, UsuarioInput> {
  public id_usuario!: number;
  public alias!: string;
  public senha!: string;
  public ativo!: boolean;
  public id_pessoa!: number;
  public readonly createdAt!: Date;

  async validateSenha(senha: string) {
    return Usuario.getHashSenha(this.alias, senha) === this.senha;
  }

  static getHashSenha(alias: string, senha: string) {
    return createHash('sha512')
      .update(alias + senha)
      .digest('hex');
  }
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
      unique: true,
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
    id_pessoa: {
      type: DataTypes.INTEGER,
      references: { model: 'pessoas', key: 'id_pessoa' },
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: BancoDeDados.getInstance().getDbInstance(),
    modelName: 'usuario',
  }
);

export default Usuario;
