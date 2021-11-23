import api from './api';

class TaskService {
  async create(name:string, description:string, project_id:number, collaborator_id:number | null) {
    try {
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

  async get(id: number) {
    try {
        const response = await api.get(`/tarefa/${id}`);
        return response.data.data;
    } catch (error) {
        console.log('Erro ao obter tarefa', error);
        throw(error)
    }
  }

  async update(task_id:number, collaborator_id:number | null, done: boolean, note: string) {
    try {
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

  async add_collaborator(task_id:number, collaborator_id:number) {
    try {
        const response = await api.put(`/tarefa/${task_id}`, {
          id_colaborador: collaborator_id
        });
        return response.data.data;
    } catch (error) {
        console.log('Erro ao adicionar colaborador', error);
        throw(error)
    }
  }
}

export default new TaskService();
