import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Avatar,
  Chip,
  Tooltip,
  Stack,
  Skeleton,
  useMediaQuery,
  useTheme,
  Button,
  Divider,
} from '@mui/material';
import {
  Edit,
  Delete,
  PictureAsPdf,
  Image as ImageIcon,
  PersonAddAlt1,
} from '@mui/icons-material';
import { Client } from '@/types';
import { getDocumentTypeLabel, calculateAge } from '@/utils';
import { API_URL } from '@/services';

interface ClientTableProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
  loading?: boolean;
  onCreateClick?: () => void;
}

const getDocumentChipColor = (tipo: string) => {
  switch (tipo) {
    case 'DNI':
      return 'primary';
    case 'RUC':
      return 'success';
    case 'CARNET_EXTRANJERIA':
      return 'warning';
    default:
      return 'default';
  }
};

const TableSkeleton = () => (
  <TableContainer component={Paper} elevation={2}>
    <Table sx={{ minWidth: 650 }}>
      <TableHead>
        <TableRow sx={{ bgcolor: 'grey.50' }}>
          <TableCell width={80}></TableCell>
          <TableCell sx={{ fontWeight: 600 }}>Nombres</TableCell>
          <TableCell sx={{ fontWeight: 600 }}>Apellidos</TableCell>
          <TableCell sx={{ fontWeight: 600 }}>Edad</TableCell>
          <TableCell sx={{ fontWeight: 600 }}>Tipo Documento</TableCell>
          <TableCell sx={{ fontWeight: 600 }}>Nro. Documento</TableCell>
          <TableCell sx={{ fontWeight: 600 }}>Archivos</TableCell>
          <TableCell align="right" sx={{ fontWeight: 600 }}>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {[1, 2, 3, 4, 5].map((i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton variant="circular" width={48} height={48} />
            </TableCell>
            <TableCell><Skeleton width="80%" /></TableCell>
            <TableCell><Skeleton width="80%" /></TableCell>
            <TableCell><Skeleton width={60} /></TableCell>
            <TableCell><Skeleton width={80} /></TableCell>
            <TableCell><Skeleton width="90%" /></TableCell>
            <TableCell><Skeleton width={60} /></TableCell>
            <TableCell align="right">
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Skeleton variant="circular" width={32} height={32} />
                <Skeleton variant="circular" width={32} height={32} />
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const CardsSkeleton = () => (
  <Stack spacing={2}>
    {[1, 2, 3].map((i) => (
      <Paper key={i} elevation={2} sx={{ p: 3 }}>
        <Stack spacing={2} alignItems="center">
          <Skeleton variant="circular" width={80} height={80} />
          <Skeleton width="60%" height={32} />
          <Skeleton width="80%" />
          <Skeleton width="70%" />
          <Stack direction="row" spacing={2} width="100%">
            <Skeleton variant="rectangular" width="48%" height={36} />
            <Skeleton variant="rectangular" width="48%" height={36} />
          </Stack>
        </Stack>
      </Paper>
    ))}
  </Stack>
);

const EmptyState = ({ onCreateClick }: { onCreateClick?: () => void }) => (
  <Paper
    elevation={0}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 400,
      border: '2px dashed',
      borderColor: 'divider',
      borderRadius: 2,
      bgcolor: 'grey.50',
      p: 4,
    }}
  >
    <Box
      sx={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        bgcolor: 'primary.light',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 3,
      }}
    >
      <PersonAddAlt1 sx={{ fontSize: 40, color: 'primary.main' }} />
    </Box>
    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
      No hay clientes registrados
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center', maxWidth: 400 }}>
      Comienza agregando tu primer cliente para gestionar la información de tu cartera.
    </Typography>
    {onCreateClick && (
      <Box
        component="button"
        onClick={onCreateClick}
        sx={{
          border: 'none',
          bgcolor: 'primary.main',
          color: 'white',
          px: 3,
          py: 1.5,
          borderRadius: 1,
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          transition: 'all 0.2s',
          '&:hover': {
            bgcolor: 'primary.dark',
            transform: 'translateY(-2px)',
          },
        }}
      >
        <PersonAddAlt1 fontSize="small" />
        Crear primer cliente
      </Box>
    )}
  </Paper>
);

const ClientCard = ({ 
  client, 
  onEdit, 
  onDelete, 
  index 
}: { 
  client: Client; 
  onEdit: (client: Client) => void; 
  onDelete: (client: Client) => void;
  index: number;
}) => {
  const handleViewFile = (url: string) => {
    window.open(`${API_URL}${url}`, '_blank');
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        animation: 'fadeIn 0.3s ease-in',
        animationDelay: `${index * 0.05}s`,
        animationFillMode: 'backwards',
        '@keyframes fadeIn': {
          from: {
            opacity: 0,
            transform: 'translateY(-10px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={client.rutaFoto ? `${API_URL}${client.rutaFoto}` : undefined}
            alt={`${client.nombres} ${client.apellidos}`}
            sx={{ width: 80, height: 80 }}
          >
            {client.nombres.charAt(0)}
          </Avatar>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {client.nombres} {client.apellidos}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {calculateAge(client.fechaNacimiento)} años
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Box>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="body2" color="text.secondary">
              Documento
            </Typography>
            <Chip
              label={getDocumentTypeLabel(client.tipoDocumento)}
              color={getDocumentChipColor(client.tipoDocumento)}
              size="small"
              sx={{ fontWeight: 500 }}
            />
          </Stack>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {client.numeroDocumento}
          </Typography>
        </Box>

        {(client.rutaHojaVida || client.rutaFoto) && (
          <>
            <Divider />
            <Box>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Archivos
              </Typography>
              <Stack direction="row" spacing={1}>
                {client.rutaHojaVida && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<PictureAsPdf />}
                    onClick={() => handleViewFile(client.rutaHojaVida!)}
                    sx={{ flex: 1 }}
                  >
                    Ver CV
                  </Button>
                )}
                {client.rutaFoto && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ImageIcon />}
                    onClick={() => handleViewFile(client.rutaFoto!)}
                    sx={{ flex: 1 }}
                  >
                    Ver Foto
                  </Button>
                )}
              </Stack>
            </Box>
          </>
        )}

        <Divider />

        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={() => onEdit(client)}
            sx={{ flex: 1 }}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={() => onDelete(client)}
            sx={{ flex: 1 }}
          >
            Eliminar
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export const ClientTable = ({ clients, onEdit, onDelete, loading, onCreateClick }: ClientTableProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleViewFile = (url: string) => {
    window.open(`${API_URL}${url}`, '_blank');
  };

  if (loading) {
    return isMobile ? <CardsSkeleton /> : <TableSkeleton />;
  }

  if (clients.length === 0) {
    return <EmptyState onCreateClick={onCreateClick} />;
  }

  if (isMobile) {
    return (
      <Stack spacing={2}>
        {clients.map((client, index) => (
          <ClientCard
            key={client.id}
            client={client}
            onEdit={onEdit}
            onDelete={onDelete}
            index={index}
          />
        ))}
      </Stack>
    );
  }

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table sx={{ minWidth: 650 }} aria-label="tabla de clientes">
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.50' }}>
            <TableCell width={80}></TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Nombres</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Apellidos</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Edad</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Tipo Documento</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Nro. Documento</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Archivos</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client, index) => (
            <TableRow
              key={client.id}
              hover
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                '&:hover': { bgcolor: 'action.hover' },
                animation: 'fadeIn 0.3s ease-in',
                animationDelay: `${index * 0.05}s`,
                animationFillMode: 'backwards',
                '@keyframes fadeIn': {
                  from: {
                    opacity: 0,
                    transform: 'translateY(-10px)',
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                },
              }}
            >
              <TableCell>
                <Avatar
                  src={client.rutaFoto ? `${API_URL}${client.rutaFoto}` : undefined}
                  alt={`${client.nombres} ${client.apellidos}`}
                  sx={{ width: 48, height: 48 }}
                >
                  {client.nombres.charAt(0)}
                </Avatar>
              </TableCell>
              <TableCell>{client.nombres}</TableCell>
              <TableCell>{client.apellidos}</TableCell>
              <TableCell>{calculateAge(client.fechaNacimiento)} años</TableCell>
              <TableCell>
                <Chip
                  label={getDocumentTypeLabel(client.tipoDocumento)}
                  color={getDocumentChipColor(client.tipoDocumento)}
                  size="small"
                  sx={{ fontWeight: 500 }}
                />
              </TableCell>
              <TableCell>{client.numeroDocumento}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={0.5}>
                  {client.rutaHojaVida && (
                    <Tooltip title="Ver CV (PDF)">
                      <IconButton
                        size="small"
                        onClick={() => handleViewFile(client.rutaHojaVida!)}
                        sx={{ color: 'error.main' }}
                      >
                        <PictureAsPdf fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  {client.rutaFoto && (
                    <Tooltip title="Ver foto">
                      <IconButton
                        size="small"
                        onClick={() => handleViewFile(client.rutaFoto!)}
                        sx={{ color: 'info.main' }}
                      >
                        <ImageIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Stack>
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Editar cliente">
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(client)}
                    aria-label={`Editar ${client.nombres} ${client.apellidos}`}
                    size="small"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar cliente">
                  <IconButton
                    color="error"
                    onClick={() => onDelete(client)}
                    aria-label={`Eliminar ${client.nombres} ${client.apellidos}`}
                    size="small"
                    sx={{ ml: 1 }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};