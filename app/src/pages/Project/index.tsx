import React, { useState, useEffect } from 'react';
import { Container, Title, Subtitle, CardContainer, ButtonContainer } from './styles';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/auth'
import AddCollaboratorToProject from './AddCollaboratorToProject';
import AddCollaboratorToTask from './AddCollaboratorToTask';
import CreateTask from './CreateTask';
import { Button, Card, CardContent, Typography, CardActions } from '@material-ui/core';

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
      <Title>{project?.nome}</Title>
      <Subtitle style={{marginTop: 32, marginBottom: 32}}>{project?.descricao}</Subtitle>
      {
          tasks.length > 0 ? (
          <CardContainer>
            {tasks.map((tarefa) => {
              return (
                // Deveria criar um TaskCard com esse conteúdo
                <Card variant="outlined" style={{ width: 300, height: 'min-content' }}>
                  <CardContent>
                    {/* Poderia mostrar no máximo 2 linhas do título e da descrição, e cortar com ... o restante */}
                    <Typography variant="h5" component="div">
                      {tarefa.nome}
                    </Typography>
                    <Typography> 
                      {tarefa.descricao}
                    </Typography>
                    <Typography variant="body2" style={{ color: '#888888'}}>
                      {!tarefa.id_colaborador ? 
                        'Essa tarefa ainda não foi atribuída a ninguém' : 
                        `Tarefa atribuída ao colaborador ${tarefa.id_colaborador}`
                      }
                    </Typography>
                  </CardContent>
                  <CardActions>
                      <Button style={{color: '#2545AA'}} size="small">Ver tarefa</Button>
                      {!tarefa.id_colaborador && 
                        <Button 
                        onClick={() => {
                          setSelectedTask(tarefa.id_tarefa);
                          setAddCollaboratorToTaskModalOpen(true);
                        }}
                        style={{color: '#2545AA'}} 
                        size="small">
                            Adicionar colaborador
                        </Button>
                      }
                  </CardActions>
                </Card>
              );
            })}
          </CardContainer>
          ): (
            <p style={{marginTop: 64, textAlign: 'center'}}>Não existe nenhuma tarefa associada</p>
          )
      }
      {user?.person_id === project?.gerenciador &&
      <ButtonContainer>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          style={{width: 300, marginTop: 16, marginRight: 16}}
          onClick={() => setAddCollaboratorToProjectModalOpen(true)}
        >
          Adicionar colaboradores ao projeto
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          style={{width: 300, marginTop: 16}}
          onClick={() => setCreateTaskModalOpen(true)}
        >
          Criar tarefas
        </Button>
      </ButtonContainer>
      }
    </Container>
  );
};

export default Project;
