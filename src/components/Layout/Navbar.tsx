import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Business } from '@mui/icons-material';

export const Navbar = () => {
  return (
    <AppBar position="static" elevation={0}>
      <Box
        sx={{
        maxWidth: 1800,
        mx: 'auto',
        width: '100%',
        px: { xs: 2, sm: 3, md: 4 },
      }}
      >
        <Toolbar disableGutters>
          <Business sx={{ mr: 2 }} />
          <Typography variant="h6" component="h1" sx={{ fontWeight: 600 }}>
            Sistema de Gestión de Clientes
          </Typography>
        </Toolbar>
      </Box>
    </AppBar>
  );
};