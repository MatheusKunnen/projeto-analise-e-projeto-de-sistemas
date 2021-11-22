import api from './api';

class PersonService {
  async get(username:string, password:string, person_id:number) {
    try {
        // Autenticação Basic - username, password.
        const response = await api.get(`/pessoa/${person_id}`);
        return response.data.data;
    } catch (error) {
        console.log('Erro ao obter pessoa', error);
        throw(error)
    }
  }

  async all(username:string, password:string) {
    try {
        // Autenticação Basic - username, password.
        const response = await api.get(`/pessoa`);
        return response.data.data;
    } catch (error) {
        console.log('Erro ao obter pessoas', error);
        throw(error)
    }
  }
}

export default new PersonService();
