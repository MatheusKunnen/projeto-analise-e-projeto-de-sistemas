import api from './api';

class UserService {
  async create(username:string, password:string, name:string, surname:string, email:string) {
    try {
        const response = await api.post('/usuario', {
            alias: username,
            senha: password,
            nome: name,
            sobrenome: surname,
            email
        });
        return response.data;
    } catch (error) {
        console.log('Erro ao cadastrar usuário', error);
        throw(error)
    }
  }

  async login(username:string, password:string) {
    try {
        const response = await api.get(`/usuario/me`, {
          auth: {
            username,
            password
          }
        });
        return response.data.data;
    } catch (error) {
        console.log('Erro ao fazer login', error);
        throw(error)
    }
  }
}

export default new UserService();
