import { useDispatch, useSelector } from 'react-redux';
import { AuthLayout } from '../layout/AuthLayout';
import { Google } from '@mui/icons-material';
import { Link as LinkRouter } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from '../../hooks';
import { startGoogleSingIn, startLoginWithLoginPassword } from '../../store/auth';
import { useMemo } from 'react';
import { Alert } from '@mui/material';

export const LoginPage = () => {

    const dispatch = useDispatch();

    const { status, errorMessage } = useSelector(state => state.auth);

    const { email, password, onInputChange } = useForm({
        email: '',
        password: ''
    });

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ email, password })
        dispatch(startLoginWithLoginPassword({ email, password }));
    };

    const handleGoogleSignIn = () => {
        console.log("On google Sign In");
        dispatch(startGoogleSingIn());
    };

    return (
        <AuthLayout title="Iniciar Sesión">
            <Box component="form" 
                 onSubmit={handleSubmit} 
                 noValidate sx={{ mt: 1 }}
                 className="animate__animated animate__fadeIn animated__faster"
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Correo electronico"
                    autoComplete="email"
                    autoFocus
                    name="email"
                    value={email}
                    onChange={onInputChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    name="password"
                    value={password}
                    onChange={onInputChange}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Recordarme"
                />
                <Grid
                    item xs={12}
                    display={!!errorMessage ? '' : 'none'}
                >
                    <Alert severity='error'>{errorMessage}</Alert>
                </Grid>
                <Button
                    disabled={isAuthenticating}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 2 }}
                >
                    <LoginIcon />
                    <Typography sx={{ ml: 1 }}>
                        Ingresar
                    </Typography>
                </Button>
                <Button
                    disabled={isAuthenticating}
                    type="submit"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 0, mb: 2 }}
                    onClick={handleGoogleSignIn}
                >
                    <Google />
                    <Typography sx={{ ml: 1 }}>Iniciar con Google</Typography>
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            ¿Olvidó la contraseña?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link component={LinkRouter} variant="body2" to="/auth/register">
                            {"¿No tienes una cuenta? Registrarte"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </AuthLayout>
    );
}