import React, { useState, useEffect } from 'react';
import { Container, Title, Subtitle } from './styles';
import {
  Modal,
  Button,
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
    setNote('');
    setEditingNote(false);
  }

  const [note, setNote] = useState<string>(task.observacao);
  const [editingNote, setEditingNote] = useState<boolean>(false);

  useEffect(() => {
    !editingNote && 
      setNote(task.observacao);
  }, [editingNote, task])

  const getPessoa = (id_colaborador: number) => {
    const person = persons.filter((person) => person.id_pessoa === id_colaborador)[0];
    return person ? person.nome + ' ' + person.sobrenome : `colaborador ${id_colaborador}`
  }

  const updateNote = () => {
    note.length < 500 ? TaskService.update_note(task.id_tarefa, note)
      .then(res => {
        setNote(res.observacao);
        setEditingNote(false);
        task.observacao = res.observacao;
        callback();
      })
      .catch(err => {
        console.log(err);
        alert('Não foi possível salvar os dados');
      }) : alert('O tamanho da observação é muito longo.');

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
          {task.id_colaborador === null ?
            'Essa tarefa ainda não foi atribuída a ninguém' : 
            user?.person_id === task.id_colaborador ?
              'Esta tarefa foi atribuída a você' : 
              `Esta tarefa foi atribuída a ${getPessoa(task.id_colaborador)}`}
        </p>
        <p>
          Observação: 
          {!editingNote ? (
            <>
            <Button 
              style={{color: '#2545AA', marginLeft: 8}} 
              size="small"
              onClick={() => {
                setEditingNote(true);
              }}
            >
              Editar
            </Button>
            <p>
              {task.observacao ? task.observacao : 'Sem observações'}
            </p>
            </>) : (
            <>
              <Button 
                style={{color: '#2545AA', marginLeft: 8}} 
                size="small"
                onClick={() => {
                  setEditingNote(false);
                }}
              >
                Cancelar edição
              </Button>
              <Button 
                style={{color: '#2545AA', marginLeft: 8}} 
                size="small"
                onClick={updateNote}
              >
                Finalizar edição
              </Button>
              <TextField
                style={{marginTop: 8}}
                variant="outlined"
                fullWidth
                id="note"
                label="Observação"
                name="note"
                autoFocus
                multiline
                minRows={4}
                maxRows={4}
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </>
            )
          }

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
                    .catch(err => {
                      console.log(err);
                      alert('Não foi possível salvar os dados');
                    })
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
