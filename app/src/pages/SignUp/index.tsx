import React, { useCallback, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useNavigate } from "react-router-dom";

import UserService from '../../services/UserService';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const validate = () => {
    if(name.length < 1) {
      alert('Nome inválido');
      return false;
    }
    if(surname.length < 1) {
      alert('Sobrenome inválido');
      return false;
    }
    if(username.length < 1) {
      alert('Alias inválido');
      return false;
    }
    if(password.length < 6) {
      alert('Senha muito curta');
      return false;
    }
    if(password.length < 6) {
      alert('Senha muito curta');
      return false;
    }
    const splitEmail = email.split('@');
    if(splitEmail.length !== 2) {
      alert('Formato de email inválido');
      return false;
    }
    if(splitEmail[1].split('.').length < 2) {
      alert('Formato de email inválido');
      return false;
    }
    return true;
  }

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    validate() &&
    UserService.create(username, password, name, surname, email)
    .then(res => {
      navigate('/login');
    })
    .catch(err => {
      console.log(err);
      alert('Não foi possível salvar os dados');
    });
  }, [username, password, email, name, surname]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastrar
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Nome de usuário"
                autoFocus
                onChange={(event) => setUsername(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nome"
                onChange={(event) => setName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="surname"
                name="surname"
                variant="outlined"
                required
                fullWidth
                id="surname"
                label="Sobrenome"
                onChange={(event) => setSurname(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Cadastrar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Já tem uma conta? Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}