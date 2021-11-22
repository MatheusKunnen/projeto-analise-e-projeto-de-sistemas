import React, { useState, useCallback, useEffect } from 'react';
import { Container, NewProjectContainer } from './styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {  Link } from "react-router-dom";
import { useAuth } from '../../hooks/auth'

import ProjectService from '../../services/ProjectService';

interface ProjectProps {
  id_projeto: number;
  nome: string;
  descricao: string;
}

const Home: React.FC = () => {
  const { user } = useAuth();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [projects, setProjects] = useState<ProjectProps[]>([]);

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
  
  const onCreateProject = useCallback(async (event) => {
    event.preventDefault();
    if(name.length < 1) {
      alert('Insira um nome válido');
      return;
    }
    else if(description.length < 1) {
      alert('Descrição inválida');
      return;
    }

    ProjectService.create(name, description)
    .then(res => {
      const proj = projects;
      proj.push({nome: res.nome, descricao: res.descricao, id_projeto: res.id_projeto});
      setProjects(proj);

      setName('');
      setDescription('');
      alert('Projeto criado com sucesso');
    })
    .catch(err => {
      alert('Não foi possível salvar os dados');
      console.log(err);
    });
  }, [name, description, projects]);

  return (
    <Container>
      <h1>Criar novo projeto</h1>
      <NewProjectContainer noValidate onSubmit={onCreateProject}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="name"
          label="Nome do projeto"
          type="name"
          style={{margin: 0, marginRight: 40}}
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="description"
          label="Descrição do projeto"
          id="description"
          multiline
          minRows={1}
          maxRows={1}
          style={{margin: 0, marginRight: 40}}
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={onCreateProject}
          style={{height: 55, width: 300}}
          >
          Criar projeto
        </Button>
      </NewProjectContainer>
      <h1>Meus projetos</h1>
      {projects.length > 0 ?
        projects.map(project => {
          return(
            // to-do: add project card
            <Link to={`/projeto/${project.id_projeto}`} key={project.id_projeto}>{project.nome}, {project.descricao}</Link>
          )
        }) : (
          <div>Não existe nenhum projeto associado</div>
        )    
    }
    </Container>
  );
};

export default Home;
