import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/auth'

import ProjectService from '../../services/ProjectService';

interface PersonProps {
  id_pessoa: number;
  nome: string;
  sobrenome: string;
  email: string;
}

interface TaskProps {
  id_tarefa: number;
  id_projeto: number;
  id_colaborador: number | null;
  nome: string;
  descricao: string;
  observacao: string;
  concluida: boolean;
}

interface ProjectProps {
  id_projeto: number;
  gerenciador: number;
  nome: string;
  descricao: string;
  colaboradores: PersonProps[];
  tarefas: TaskProps[];
}

const Project: React.FC = () => {
  const [project, setProject] = useState<ProjectProps>();
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  let { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    user && updateProject();
  }, [user])

  const updateProject = () => {
    id &&
    ProjectService.get(parseInt(id))
      .then(res => {
        setProject(res);
        if(res.tarefas) {
          if(user?.person_id === res.gerenciador) {
            setTasks(res.tarefas);
          }
          else {
            const tarefas = res.tarefas.filter((tarefa: TaskProps) => {
              return tarefa.id_colaborador === user?.person_id;
            })
            setTasks(tarefas);
          }
        }
      })
      .catch(err => {
        console.log(err);
        alert('Ocorreu um erro inesperado');
      })
  }

  return (
    <Container>
      <h1>{project?.nome}</h1>
      <h2>{project?.descricao}</h2>

      {user?.person_id === project?.gerenciador &&
      <>
        <h4>Você é o gerenciador</h4>
        <button>Adicionar colaboradores</button>
        <button>Criar tarefas</button>
        <button>Associar tarefas aos colaboradores</button>
      </>
      }
      {/* to-do: Adicionar um card de tarefa */
        tasks.length > 0 ? 
          tasks.map((tarefa) => {
            return (
              <div key={tarefa.id_tarefa}>
                {tarefa.nome}: {tarefa.descricao} - {tarefa.id_colaborador}
              </div>
            );
          }) : (
            <div>Não existe nenhuma tarefa associada</div>
          )
      }
    </Container>
  );
};

export default Project;
