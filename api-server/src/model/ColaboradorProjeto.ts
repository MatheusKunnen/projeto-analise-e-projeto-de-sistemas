import BancoDeDados from '../BancoDeDados';
import { DataTypes, Model, Optional } from 'sequelize';

interface ColaboradorProjetoAttributes {
  id: number;
  id_pessoa: number;
  id_projeto: number;
}
export interface ColaboradorProjetoInput
  extends Optional<ColaboradorProjetoAttributes, 'id'> {}

class ColaboradorProjeto extends Model<
  ColaboradorProjetoAttributes,
  ColaboradorProjetoInput
> {
  public id!: number;
  public id_pessoa!: number;
  public id_projeto!: number;
}

ColaboradorProjeto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_pessoa: {
      type: DataTypes.INTEGER,
      references: { model: 'pessoas', key: 'id_pessoa' },
    },
    id_projeto: {
      type: DataTypes.INTEGER,
      references: { model: 'projetos', key: 'id_projeto' },
    },
  },
  {
    sequelize: BancoDeDados.getInstance().getDbInstance(),
    modelName: 'colaborador_projeto',
    indexes: [{ unique: true, fields: ['id_pessoa', 'id_projeto'] }],
  }
);

export default ColaboradorProjeto;
