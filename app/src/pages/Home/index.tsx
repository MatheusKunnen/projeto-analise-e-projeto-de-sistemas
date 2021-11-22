import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import {  Link } from "react-router-dom";
import { useAuth } from '../../hooks/auth'
import NewProject from './NewProject';

import ProjectService from '../../services/ProjectService';

interface ProjectProps {
  id_projeto: number;
  gerenciador: number;
  nome: string;
  descricao: string;
}

const Home: React.FC = () => {
  const { user } = useAuth();

  const [projects, setProjects] = useState<ProjectProps[]>([]);

  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);
  const handleOpenModal = () => setCreateProjectModalOpen(true);

  useEffect(() => {
    user && updateProjects();
  }, [user])

  const updateProjects = () => {
    ProjectService.all()
      .then(res => {
        setProjects(res);
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  const onCreateProject = (project: ProjectProps) => {
    const allProjects = projects;
    allProjects.push(project);
    setProjects(allProjects);
  };

  return (
    <Container>
      <NewProject open={createProjectModalOpen} setOpen={setCreateProjectModalOpen} onCreateProjectCallback={onCreateProject}/>
      <h1>Meus projetos</h1>
      {projects.length > 0 ?
        projects.map(project => {
          return(
            // to-do: add project card
            <Link to={`/projeto/${project.id_projeto}`} key={project.id_projeto}>{project.nome}, {project.descricao} - 
            Você é {user?.person_id === project.gerenciador ? 'gerenciador' : 'colaborador'} desse projeto</Link>
          )
        }) : (
          <div>Não existe nenhum projeto associado</div>
          )    
        }
      <button onClick={handleOpenModal}>Criar novo projeto</button>
    </Container>
  );
};

export default Home;
