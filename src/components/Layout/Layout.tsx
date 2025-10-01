import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          px: { xs: 2, sm: 3, md: 4 }, // Padding responsive
          py: { xs: 3, md: 4 },
          bgcolor: 'grey.50', // Fondo sutil para diferenciar del paper
        }}
      >
        {children}
      </Box>
    </Box>
  );
};