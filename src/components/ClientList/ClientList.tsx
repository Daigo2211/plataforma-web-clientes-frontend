import { useState } from 'react';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import { ClientActions } from './ClientActions';
import { ClientTable } from './ClientTable';
import { ClientForm } from '@/components/ClientForm';
import { ConfirmDialog, LoadingSpinner, ErrorAlert } from '@/components/shared';
import { useClients, useSnackbar } from '@/hooks';
import { Client } from '@/types';
import { exportClientsToCSV } from '@/utils';

export const ClientList = () => {
  const { clients, loading, error, createClient, updateClient, deleteClient } = useClients();
  const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleCreateClick = () => {
    setSelectedClient(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (client: Client) => {
    setSelectedClient(client);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (client: Client) => {
    setSelectedClient(client);
    setIsDeleteDialogOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedClient(null);
  };

  const handleFormSubmit = async (formData: FormData) => {
    try {
      let success: boolean;

      if (selectedClient) {
        success = await updateClient(selectedClient.id, formData);
        if (success) {
          showSnackbar('Cliente actualizado correctamente', 'success');
        } else {
          showSnackbar('Error al actualizar el cliente', 'error');
        }
      } else {
        success = await createClient(formData);
        if (success) {
          showSnackbar('Cliente creado correctamente', 'success');
        } else {
          showSnackbar('Error al crear el cliente', 'error');
        }
      }
    } catch (err) {
      showSnackbar('Error inesperado al guardar', 'error');
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedClient) return;

    const success = await deleteClient(selectedClient.id);
    if (success) {
      showSnackbar('Cliente eliminado correctamente', 'success');
    } else {
      showSnackbar('Error al eliminar el cliente', 'error');
    }

    setIsDeleteDialogOpen(false);
    setSelectedClient(null);
  };

  const handleDownloadCSV = () => {
    if (clients.length === 0) {
      showSnackbar('No hay clientes para exportar', 'warning');
      return;
    }

    try {
      exportClientsToCSV(clients);
      showSnackbar('CSV descargado correctamente', 'success');
    } catch (err) {
      showSnackbar('Error al generar el CSV', 'error');
    }
  };

  if (loading && clients.length === 0) {
    return <LoadingSpinner />;
  }

  if (error && clients.length === 0) {
    return <ErrorAlert message={error} />;
  }

  return (
    <Box sx={{ maxWidth: 1800, mx: 'auto', width: '100%', px: 2 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Catálogo de Clientes
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gestiona la información de tus clientes
        </Typography>
      </Box>

      <ClientActions
        onCreateClick={handleCreateClick}
        onDownloadCSV={handleDownloadCSV}
        hasClients={clients.length > 0}
      />

      <ClientTable
      clients={clients}
      onEdit={handleEditClick}
      onDelete={handleDeleteClick}
      loading={loading}
      onCreateClick={handleCreateClick}
    />

      <ClientForm
        open={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        client={selectedClient}
        loading={loading}
      />

      <ConfirmDialog
        open={isDeleteDialogOpen}
        title="Confirmar eliminación"
        message={`¿Estás seguro de eliminar a ${selectedClient?.nombres} ${selectedClient?.apellidos}?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setSelectedClient(null);
        }}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={hideSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};