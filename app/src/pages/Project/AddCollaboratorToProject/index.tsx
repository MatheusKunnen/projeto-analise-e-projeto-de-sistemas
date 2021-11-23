import React, { useState, useEffect } from 'react';
import { Container, Title, Subtitle } from './styles';
import { Modal, Button, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import PersonService from '../../../services/PersonService';
import ProjectService from '../../../services/ProjectService';

interface PersonProps {
  id_pessoa: number;
  nome: string;
  sobrenome: string;
  email: string;
}

interface AddCollaboratorToProjectProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: number;
  collaborators: PersonProps[];
  callback: () => void;
}

const AddCollaboratorToProject: React.FC<AddCollaboratorToProjectProps> = ({open, setOpen, collaborators, projectId, callback}) => {
  const [selected, setSelected] = useState<number>();
  const [filteredCollaborators, setFilteredCollaborators] = useState([]);
  const handleClose = () => setOpen(false);

  const handleChange = (event: any) => {
    setSelected(event.target.value);
  };

  const handleAddCollaboratorToProject = (event: any) => {
    event.preventDefault();
    selected ? ProjectService.add_collaborator(projectId, selected)
      .then(res => {
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

  useEffect(() => {
    PersonService.all()
      .then(res => {
        const collaboratorsIds = collaborators.map((collab2: PersonProps) => collab2.id_pessoa);
        const avaiableNewCollaborators = res.filter((collab: PersonProps) => !collaboratorsIds.includes(collab.id_pessoa));
        setFilteredCollaborators(avaiableNewCollaborators);
      })
      .catch(err => {
        console.log(err);
      })
  }, [collaborators, selected])

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Container>
        <Title>Adicionar colaborador</Title>
        <Subtitle style={{marginTop: 8}}>Atualmente esses são os colaboradores do seu projeto: </Subtitle>
        {collaborators.map((collaborator: PersonProps) => {
          return (
            <p style={{marginBottom: 0, marginTop: 16}}>{collaborator.nome} {collaborator.sobrenome}</p>
          );
        })}
        <Subtitle>Selecione o novo colaborador do projeto: </Subtitle>
        <FormControl variant="standard" style={{minWidth: 300, marginBottom: 24}} >
          <InputLabel id="demo-simple-select-standard-label">Colaborador</InputLabel>
          <Select
            value={selected}
            onChange={handleChange}
            label="Colaborador"
          >
            {filteredCollaborators.map((collaborator: PersonProps) => {
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
