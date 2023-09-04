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
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const registerFormFields = {
  name: '',
  lastName: '',
  email: '',
  password: '',
  apartmentNumber: '',
  confirmPassword: '',
}

export const RegisterPages = () => {
  const { startRegister, errorMessage } = useAuthStore();
  const { name, lastName, email, password, confirmPassword, apartmentNumber, onInputChange } = useForm(registerFormFields);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if ( password !== confirmPassword ) {
      Swal.fire('Error en registro', 'Contraseñas no son iguales',  'error');
      return;
  }
   startRegister({name, lastName, email, password, apartmentNumber});
    
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
           Registrarse
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nombre"
                  value={ name }
                  onChange={ onInputChange }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  value={ lastName }
                  onChange={ onInputChange }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="apartmentNumber"
                  label="Numero de departamento"
                  name="apartmentNumber"
                  value={ apartmentNumber }
                  onChange={ onInputChange }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Correo electronico"
                  name="email"
                  value={ email }
                  onChange={ onInputChange }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  value={ password }
                  onChange={ onInputChange }
                  autoComplete='password'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirmar contraseña"
                  type="password"
                  id="confirmPassword"
                  value={ confirmPassword }
                  onChange={ onInputChange }
                  autoComplete='confirmPassword'
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/auth/login/" variant="body2">
                    ¿Ya tienes una cuenta? Iniciar sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}