import React, { useState, useEffect } from 'react';
import { Container, Title, Subtitle } from './styles';
import { Modal, Button, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import TaskService from '../../../services/TaskService';

interface PersonProps {
  id_pessoa: number;
  nome: string;
  sobrenome: string;
  email: string;
}

interface AddCollaboratorToProjectProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  taskId: number;
  collaborators: PersonProps[];
  callback: () => void;
}

const AddCollaboratorToProject: React.FC<AddCollaboratorToProjectProps> = ({open, setOpen, collaborators, taskId, callback}) => {
  const [selectedCollaborator, setSelectedCollaborator] = useState<number | null>(null);
  const handleClose = () => {
    setSelectedCollaborator(null);
    setOpen(false);
  }

  const handleChange = (event: any) => {
    setSelectedCollaborator(event.target.value);
  };

  const handleAddCollaboratorToProject = (event: any) => {
    event.preventDefault();
    selectedCollaborator ? TaskService.add_collaborator(taskId, selectedCollaborator)
      .then(res => {
        console.log(res);
        alert('Colaborador adicionado com sucesso!');
        callback();
        handleClose();
      })
      .catch(err => {
        console.log(err);
        alert('Não foi possível salvar os dados');
      })
    : alert('Selecione uma pessoa da lista');
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Container>
        <Title>Adicionar colaborador</Title>
        <Subtitle>Selecione o colaborador da tarefa: </Subtitle>
        <FormControl variant="standard" style={{minWidth: 300, marginBottom: 24}} >
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleAddCollaboratorToProject}
          style={{height: 55, width: 300}}
          >
          Adicionar colaborador
        </Button>
      </Container>
    </Modal>
  );
};

export default AddCollaboratorToProject;
