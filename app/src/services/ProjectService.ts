import api from './api';

class ProjectService {
  async create(name:string, description:string) {
    try {
        const response = await api.post('/projeto', {
            nome: name,
            descricao: description
        });
        return response.data.data;
    } catch (error) {
        console.log('Erro ao criar projeto', error);
        throw(error)
    }
  }

  async all() {
    try {
        const response = await api.get(`/projeto`);
        return response.data.data;
    } catch (error) {
        console.log('Erro ao obter projeto', error);
        throw(error)
    }
  }

  async get(id: number) {
    try {
        const response = await api.get(`/projeto/${id}`);
        return response.data.data;
    } catch (error) {
        console.log('Erro ao obter projeto', error);
        throw(error)
    }
  }

  async add_collaborator(project_id: number, person_id: number) {
    try {
        const response = await api.put(`/projeto/${project_id}/add_colaborador/${person_id}`);
        return response.data.data;
    } catch (error) {
        console.log('Erro ao adicionar colaborador', error);
        throw(error)
    }
  }
}

export default new ProjectService();
