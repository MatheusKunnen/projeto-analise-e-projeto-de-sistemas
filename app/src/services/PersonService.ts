import api from './api';

class PersonService {
  async get(username:string, password:string, person_id:string) {
    try {
        // Autenticação Basic - username, password.
        const response = await api.get(`/pessoa/${person_id}`);
        return response.data;
    } catch (error) {
        console.log('Erro ao obter pessoa', error);
        return [];
    }
  }

  async all(username:string, password:string) {
    try {
        // Autenticação Basic - username, password.
        const response = await api.get(`/pessoa`);
        return response.data;
    } catch (error) {
        console.log('Erro ao fazer login', error);
        return [];
    }
  }
}

export default new PersonService();
