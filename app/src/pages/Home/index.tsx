import React, { useState, useCallback } from 'react';
import { Container, NewProjectContainer } from './styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import ProjectService from '../../services/ProjectService';

const Home: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const onCreateProject = useCallback(async (event) => {
    event.preventDefault();
    console.log(name, description);
    ProjectService.create('username', 'password', name, description)
    .then(res => {
      console.log(res);
      setName('');
      setDescription('');
      alert('Projeto criado com sucesso');
    })
    .catch(err => {
      alert('Erro ao criar projeto');
      console.log(err);
    });
  }, [name, description]);

  return (
    <Container>
      <h1>Criar novo projeto</h1>
      <NewProjectContainer noValidate onSubmit={onCreateProject}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="name"
          label="Nome do projeto"
          type="name"
          style={{margin: 0, marginRight: 40}}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="description"
          label="Descrição do projeto"
          id="description"
          multiline
          minRows={1}
          maxRows={1}
          style={{margin: 0, marginRight: 40}}
          onChange={(event) => setDescription(event.target.value)}
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
    </Container>
  );
};

export default Home;
