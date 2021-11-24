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
import { useAuth } from '../../../hooks/auth'

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

interface TaskComponentProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  task: TaskProps;
  persons: PersonProps[];
  callback: () => void;
}

const Task: React.FC<TaskComponentProps> = ({open, setOpen, task, callback, persons}) => {
  const { user } = useAuth();
  const handleClose = () => {
    setOpen(false);
  }

  const getPessoa = (id_colaborador: number) => {
    const person = persons.filter((person) => person.id_pessoa === id_colaborador)[0];
    return person ? person.nome + ' ' + person.sobrenome : `colaborador ${id_colaborador}`
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Container 
        style={{backgroundColor: task.concluida ? '#DDFFDD ': '#FFFFFF'}}
      >
        <Title>{task.nome}</Title>
        <Subtitle>
          {task.descricao}
        </Subtitle>
        <p>
          {
          task.id_colaborador === null ?
            'Essa tarefa ainda não foi atribuída a ninguém' : 
            user?.person_id === task.id_colaborador ?
              'Esta tarefa foi atribuída a você' : 
              `Esta tarefa foi atribuída a ${getPessoa(task.id_colaborador)}`
          }
        </p>
        <p>
          Observação: 
          <Button 
            style={{color: '#2545AA', marginLeft: 8}} 
            size="small"
            onClick={() => {
            }}
          >
            Editar
          </Button>
          <p>
            {task.observacao ? task.observacao : 'Sem observações'}
          </p>
        </p>
        <p>
          Estado da tarefa:
          {!task.concluida && (
                <Button 
                style={{color: '#2545AA', marginLeft: 8}} 
                size="small"
                onClick={() => {
                  // eslint-disable-next-line no-restricted-globals
                  let val = confirm("Você deseja concluir essa tarefa?");
                  if (val === true) {
                    TaskService.conclude(task.id_tarefa)
                      .then(res => {
                        if(res.concluida) {
                          callback();
                          alert('Tarefa concluída com sucesso!');
                          handleClose();
                        }
                        else {
                          alert('Não foi possível salvar os dados');
                        }
                      })
                    // concluir tarefa
                  }
                }}
              >
                Editar
              </Button>
            )}
          <p>
            {task.concluida ? 'Concluída' : 'Não concluída'}
          </p>
        </p>
      </Container>
    </Modal>
  );
};

export default Task;
