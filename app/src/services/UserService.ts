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
        return [];
    }
  }

  async login(id: string) {
    try {
        const response = await api.get(`/usuario/me`);
        // Autenticação Basic - username, password.
        return response.data;
    } catch (error) {
        console.log('Erro ao fazer login', error);
        return [];
    }
  }
}

export default new UserService();
