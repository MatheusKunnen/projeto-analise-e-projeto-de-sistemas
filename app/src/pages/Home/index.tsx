import React, { useState, useEffect } from 'react';
import { Container, Title, Subtitle, CardContainer } from './styles';
import {  Link } from "react-router-dom";
import { useAuth } from '../../hooks/auth'
import NewProject from './NewProject';
import { Button, Card, CardContent, Typography, CardActions } from '@material-ui/core';

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
      <Title>Projetos</Title>
      <Subtitle style={{marginTop: 16, marginBottom: 16}}>Nessa área você pode visualizar todos os seus projetos</Subtitle>
      <CardContainer>
        {projects.length > 0 ?
          projects.map(project => {
            return(
              // Deveria criar um ProjectCard com esse conteúdo
                <Card variant="outlined" style={{ width: 300 }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {project.nome}
                    </Typography>
                    <Typography >
                      {project.descricao}
                    </Typography>
                    <Typography variant="body2" style={{ color: '#888888',  }}>
                      Você é {user?.person_id === project.gerenciador ? 'gerenciador' : 'colaborador'} desse projeto
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={`/projeto/${project.id_projeto}`} style={{textDecoration: 'none'}}>
                      <Button style={{color: '#2545AA'}} size="small">Ver projeto</Button>
                    </Link>
                  </CardActions>
                </Card>
            )
          }) : (
            <div>Não existe nenhum projeto associado</div>
          )    
        }
      </CardContainer>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        style={{width: 300, marginTop: 32}}
        onClick={handleOpenModal}
      >
        Criar novo projeto
      </Button>
    </Container>
  );
};

export default Home;
