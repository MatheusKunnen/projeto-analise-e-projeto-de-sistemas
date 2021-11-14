import { Sequelize } from 'sequelize';

export default class BancoDeDados {
  private static instance?: BancoDeDados;
  private dbInstance: Sequelize;

  private constructor(filePath: string) {
    this.dbInstance = new Sequelize({ dialect: 'sqlite', storage: filePath });
  }

  getDbInstance() {
    return this.dbInstance;
  }

  static getInstance(filePath?: string) {
    if (typeof filePath === 'undefined') filePath = 'db.sqlite';
    if (typeof BancoDeDados.instance === 'undefined') {
      BancoDeDados.instance = new BancoDeDados(filePath);
    }
    return BancoDeDados.instance;
  }
}
