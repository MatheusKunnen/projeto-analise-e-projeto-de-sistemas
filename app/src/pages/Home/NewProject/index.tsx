import React, { useState, useCallback } from 'react';
import { Container, NewProjectContainer, Title } from './styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Modal } from '@material-ui/core';

import ProjectService from '../../../services/ProjectService';

interface ProjectProps {
  id_projeto: number;
  gerenciador: number;
  nome: string;
  descricao: string;
}

interface NewProjectProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCreateProjectCallback: (project: ProjectProps) => void;
}

const NewProject: React.FC<NewProjectProps> = ({open, setOpen, onCreateProjectCallback}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleClose = () => setOpen(false);
  
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
    .then((res: ProjectProps) => {
      setName('');
      setDescription('');
      alert('Projeto criado com sucesso');
      onCreateProjectCallback(res);
      setOpen(false);
    })
    .catch(err => {
      alert('Não foi possível salvar os dados');
      console.log(err);
    });
  }, [name, description, onCreateProjectCallback, setOpen]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Container>
        <Title>Criar novo projeto</Title>
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
      </Container>
    </Modal>
  );
};

export default NewProject;
