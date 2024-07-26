import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link as LinkRouter } from 'react-router-dom';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';
import { Alert } from '@mui/material';

const formData = {
  name: '',
  lastName: '',
  email: '',
  password: '',
  displayName: ''
}

//Validacion basica -> Modificar despues por Regex
const formValidations = {
  name: [(value) => value.length >= 1, 'Nombre requerido'],
  lastName: [(value) => value.length >= 1, 'Apellido requerido'],
  email: [(value) => value.includes('@'), 'El correo debe de tener un @'],
  password: [(value) => value.length >= 6, 'El password debe de tener mas de 6 letras'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted,setFormSubmitted ] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth)

  const isCheckingAutentication = useMemo(() => status === 'checking',[status]);

  const { name, lastName, email, password, onInputChange,
    formState, isFormValid, nameValid, lastNameValid,
    emailValid, passwordValid } = useForm(formData, formValidations)

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if(!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Registrarse">
      <Box component="form" 
           noValidate 
           className="animate__animated animate__fadeIn animated__faster"
           onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              required
              fullWidth
              id="firstName"
              label="Nombre"
              autoFocus
              name="name"
              onChange={onInputChange}
              value={name}
              error={!!nameValid && formSubmitted}
              helperText={nameValid}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Apellido"
              name="lastName"
              autoComplete="family-name"
              onChange={onInputChange}
              value={lastName}
              error= {!!lastNameValid && formSubmitted}
              helperText={lastNameValid}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Correo Electronico"
              autoComplete="email"
              name="email"
              onChange={onInputChange}
              value={email}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="new-password"
              name="password"
              onChange={onInputChange}
              value={password}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>
          <Grid 
            item xs={12}
            display={!!errorMessage ? '': 'none'}
          >
              <Alert severity='error'>{errorMessage}</Alert>
          </Grid>
        </Grid>
        <Button
          disabled = { isCheckingAutentication }
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          <HowToRegIcon />
          <Typography sx={{ ml: 1 }}>Registrarse</Typography>
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link component={LinkRouter} variant="body2" to="/auth/login">
              ¿Ya tienes una cuenta? Iniciar Sesión
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
}