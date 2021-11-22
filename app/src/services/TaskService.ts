import api from './api';

class TaskService {
  async create(username:string, password:string, name:string, description:string, project_id:number, collaborator_id:number) {
    try {
        // Basic authentication
        const response = await api.post('/tarefa', {
            nome: name,
            descricao: description,
            id_projeto: project_id,
            id_colaborador: collaborator_id
        });
        return response.data.data;
    } catch (error) {
        console.log('Erro ao criar tarefa', error);
        throw(error)
    }
  }

  async get(username:string, password:string, id: number) {
    try {
        // Autenticação Basic - username, password.
        const response = await api.get(`/tarefa/${id}`);
        return response.data.data;
    } catch (error) {
        console.log('Erro ao obter tarefa', error);
        throw(error)
    }
  }

  async update(username:string, password:string, task_id:number, collaborator_id:string, done: boolean, note: string) {
    try {
        // Autenticação Basic - username, password.
        const response = await api.put(`/tarefa/${task_id}`, {
          observacao: note,
          concluida: done, 
          id_colaborador: collaborator_id
        });
        return response.data.data;
    } catch (error) {
        console.log('Erro ao atualizar tarefa', error);
        throw(error)
    }
  }
}

export default new TaskService();
