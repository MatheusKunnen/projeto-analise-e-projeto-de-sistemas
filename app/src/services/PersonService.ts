import api from './api';

class PersonService {
  async get(person_id:number) {
    try {
        const response = await api.get(`/pessoa/${person_id}`);
        return response.data.data;
    } catch (error) {
        console.log('Erro ao obter pessoa', error);
        throw(error)
    }
  }

  async all() {
    try {
        const response = await api.get(`/pessoa`);
        return response.data.data;
    } catch (error) {
        console.log('Erro ao obter pessoas', error);
        throw(error)
    }
  }
}

export default new PersonService();
