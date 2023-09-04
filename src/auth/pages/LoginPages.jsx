import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const loginFormFields = {
  email: '',
  password: '',
}




export const LoginPages = () => {
  const { startLogin, errorMessage } = useAuthStore();
 const { email, password, onInputChange } =  useForm(loginFormFields);

  const handleSubmit = (event) => {
    event.preventDefault();
    startLogin({email, password});
  };

  useEffect(() => {
    if( errorMessage !== undefined ) {
       Swal.fire('Error en la autenticación', errorMessage, 'error');
    }
  
  }, [errorMessage])

  return (

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Inicar sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electronico"
              name="email"
              value={ email }
              onChange={ onInputChange }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              value={ password }
              onChange={ onInputChange}
              id="password"
              autoComplete='password'
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/auth/recovery-account/" variant="body2">
                ¿Has olvidado tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/auth/sigup/" variant="body2">
                  {"¿No tienes una cuenta? Registrate"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

