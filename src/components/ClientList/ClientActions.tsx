import { Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';

interface ClientActionsProps {
  onCreateClick: () => void;
  onDownloadCSV: () => void;
  hasClients: boolean;
}

export const ClientActions = ({ onCreateClick, onDownloadCSV, hasClients }: ClientActionsProps) => {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      sx={{ mb: 3 }}
    >
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onCreateClick}
        sx={{ width: { xs: '100%', sm: 'auto' } }}
      >
        Nuevo Cliente
      </Button>
      <Button
        variant="outlined"
        startIcon={<DownloadIcon />}
        onClick={onDownloadCSV}
        disabled={!hasClients}
        sx={{ width: { xs: '100%', sm: 'auto' } }}
      >
        Descargar CSV
      </Button>
    </Stack>
  );
};