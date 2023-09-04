
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useEffect } from 'react';


const resetPasswordForm = {
  password: "",
  confirmPassword: "",
}



export const ResetPassword = () => {
  const { resetPassword, getCodeById } = useAuthStore();
  const {password, confirmPassword, onInputChange } = useForm( resetPasswordForm );


  useEffect(() => {
    getCodeById(); 
  }, [])


  const handleSubmit = (event) => {
    event.preventDefault();
    resetPassword({password, confirmPassword});

  };

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
            Recuperar contraseña
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              value={ password }
              onChange={ onInputChange }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmar contraseña"
              type="password"
              id="confirmPassword"
              value={ confirmPassword }
              onChange={ onInputChange }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Recuperar contraseña
            </Button>
            <Grid container>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

