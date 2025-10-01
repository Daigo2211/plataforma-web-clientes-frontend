import { api } from './api';
import { Client, ApiResponse } from '@/types';

export const clientService = {
  getAll: async (): Promise<Client[]> => {
    const response = await api.get<ApiResponse<Client[]>>('/api/clientes');
    return response.data.data; 
  },

  getById: async (id: number): Promise<Client> => {
    const response = await api.get<ApiResponse<Client>>(`/api/clientes/${id}`);
    return response.data.data; 
  },

  create: async (formData: FormData): Promise<Client> => {
    const response = await api.post<ApiResponse<Client>>('/api/clientes', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data; 
  },

  update: async (id: number, formData: FormData): Promise<Client> => {
    const response = await api.put<ApiResponse<Client>>(`/api/clientes/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data; 
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/clientes/${id}`);
  },
};