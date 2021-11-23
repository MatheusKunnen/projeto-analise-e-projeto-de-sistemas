import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/auth'
import AddCollaboratorToProject from './AddCollaboratorToProject';
import AddCollaboratorToTask from './AddCollaboratorToTask';
import CreateTask from './CreateTask';

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
  const [selectedTask, setSelectedTask] = useState<number>();

  const [addCollaboratorToProjectModalOpen, setAddCollaboratorToProjectModalOpen] = useState(false);
  const [addCollaboratorToTaskModalOpen, setAddCollaboratorToTaskModalOpen] = useState(false);
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);

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
      <AddCollaboratorToProject 
        open={addCollaboratorToProjectModalOpen} 
        setOpen={setAddCollaboratorToProjectModalOpen}
        projectId={project?.id_projeto ? project.id_projeto : -1}
        collaborators={project?.colaboradores ? project?.colaboradores : []}
        callback={updateProject}
      />
      <AddCollaboratorToTask
        open={addCollaboratorToTaskModalOpen} 
        setOpen={setAddCollaboratorToTaskModalOpen}
        taskId={selectedTask? selectedTask : -1}
        collaborators={project?.colaboradores ? project?.colaboradores : []}
        callback={updateProject}
      />
      <CreateTask 
        open={createTaskModalOpen} 
        setOpen={setCreateTaskModalOpen} 
        projectId={project?.id_projeto ? project.id_projeto : -1}
        collaborators={project?.colaboradores ? project?.colaboradores : []}
        callback={updateProject}
      />
      <h1>{project?.nome}</h1>
      <h2>{project?.descricao}</h2>

      {user?.person_id === project?.gerenciador &&
      <>
        <button onClick={() => setAddCollaboratorToProjectModalOpen(true)}>Adicionar colaboradores</button>
        <button onClick={() => setCreateTaskModalOpen(true)}>Criar tarefas</button>
      </>
      }
      {/* to-do: Adicionar um card de tarefa */
        tasks.length > 0 ? 
          tasks.map((tarefa) => {
            return (
              <div key={tarefa.id_tarefa} style={{display: 'flex', flexDirection: 'row', marginTop: 8, backgroundColor: '#DDDDDD'}}>
                <div>{tarefa.nome}: {tarefa.descricao} - {tarefa.id_colaborador}</div>
                {user?.person_id === project?.gerenciador &&
                  <button 
                  style={{marginLeft: 4}}
                  onClick={() => {
                    setSelectedTask(tarefa.id_tarefa);
                    setAddCollaboratorToTaskModalOpen(true);
                  }}
                  >
                    +
                  </button>
                }
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
