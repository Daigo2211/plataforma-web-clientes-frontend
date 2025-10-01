import { useState, useEffect, useCallback } from 'react';
import { clientService } from '@/services';
import { Client } from '@/types';

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await clientService.getAll();
      setClients(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al cargar los clientes';
      setError(errorMessage);
      console.error('Error fetching clients:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createClient = async (formData: FormData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await clientService.create(formData);
      await fetchClients();
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al crear el cliente';
      setError(errorMessage);
      console.error('Error creating client:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateClient = async (id: number, formData: FormData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await clientService.update(id, formData);
      await fetchClients();
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al actualizar el cliente';
      setError(errorMessage);
      console.error('Error updating client:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await clientService.delete(id);
      await fetchClients();
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al eliminar el cliente';
      setError(errorMessage);
      console.error('Error deleting client:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return {
    clients,
    loading,
    error,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
  };
};