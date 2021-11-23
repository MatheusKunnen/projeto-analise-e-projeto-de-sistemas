import React, { useState } from 'react';
import { Container, Title, FieldContainer, Subtitle } from './styles';
import {
  Modal,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField
} from '@material-ui/core';
import TaskService from '../../../services/TaskService';

interface PersonProps {
  id_pessoa: number;
  nome: string;
  sobrenome: string;
  email: string;
}

interface CreateTaskProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: number;
  collaborators: PersonProps[];
  callback: () => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({open, setOpen, collaborators, projectId, callback}) => {
  const [selectedCollaborator, setSelectedCollaborator] = useState<number | null>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const handleClose = () => {
    setOpen(false);
    setSelectedCollaborator(null);
    setName('');
    setDescription('');
  }

  const handleChange = (event: any) => {
    setSelectedCollaborator(event.target.value);
  };

  const validate = () => {
    if(name.length < 1) {
      alert('Insira um nome válido');
      return false;
    }
    if(description.length < 1) {
      alert('Descrição inválida');
      return false;
    }
    return true;
  }

  const handleCreateTask = (event: any) => {
    event.preventDefault();
    validate() && TaskService.create(name, description, projectId, selectedCollaborator)
      .then(res => {
        alert('Tarefa criada com sucesso');
        callback();
        handleClose();
      })
      .catch(err => {
        console.log(err);
        alert('Não foi possível salvar os dados');
      })
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Container>
        <Title>Criar tarefa</Title>
        <Subtitle>
          Crie uma nova tarefa para o seu projeto. <br/>Lembre-se que, se precisar, você pode adicionar o 
          colaborador mais tarde,
        </Subtitle>
        <div>
          <FieldContainer>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Nome da tarefa"
              name="name"
              autoFocus
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FieldContainer>
          <FieldContainer>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="description"
              label="Descrição da tarefa"
              name="description"
              multiline
              minRows={4}
              maxRows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </FieldContainer>
          <div>
            <FormControl variant="standard" style={{minWidth: 300, marginBottom: 16}} >
              <InputLabel id="demo-simple-select-standard-label">Colaborador</InputLabel>
              <Select
                value={selectedCollaborator}
                onChange={handleChange}
                label="Colaborador"
              >
                {collaborators.map((collaborator: PersonProps) => {
                  return (
                    <MenuItem 
                      key={collaborator.id_pessoa} 
                      value={collaborator.id_pessoa}>
                        {collaborator.nome} {collaborator.sobrenome}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </div>
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleCreateTask}
              style={{height: 55, width: 300}}
            >
              Criar tarefa
            </Button>
          </div>
        </div>
      </Container>
    </Modal>
  );
};

export default CreateTask;
