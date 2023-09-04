import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuthStore } from '../../hooks/useAuthStore';

export const NavBar = () => {
  const { startLogout, user } = useAuthStore();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>    
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user.name}
          </Typography>
          <Button onClick={ startLogout } color="inherit">Salir</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}