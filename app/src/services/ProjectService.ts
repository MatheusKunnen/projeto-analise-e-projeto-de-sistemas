import api from './api';

class ProjectService {
  async create(username:string, password:string, name:string, description:string) {
    try {
        // Basic authentication
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

  async get(username:string, password:string, id: number) {
    try {
        // Autenticação Basic - username, password.
        const response = await api.get(`/projeto/${id}`);
        return response.data.data;
    } catch (error) {
        console.log('Erro ao obter projeto', error);
        throw(error)
    }
  }

  async add_collaborator(username:string, password:string, project_id: number, person_id: number) {
    try {
        // Autenticação Basic - username, password.
        const response = await api.put(`/projeto/${project_id}/add_colaborador/${person_id}`);
        return response.data.data;
    } catch (error) {
        console.log('Erro ao adicionar colaborador', error);
        throw(error)
    }
  }
}

export default new ProjectService();
