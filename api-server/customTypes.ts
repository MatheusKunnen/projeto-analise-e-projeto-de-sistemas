import Usuario from './src/model/Usuario';

declare global {
  namespace Express {
    interface Request {
      usuario?: Usuario;
    }
  }
}
