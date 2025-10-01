import Papa from 'papaparse';
import { Client } from '@/types';
import { formatDate, getDocumentTypeLabel } from './formatters';

export const exportClientsToCSV = (clients: Client[]) => {
  const csvData = clients.map(client => ({
    Nombres: client.nombres,
    Apellidos: client.apellidos,
    'Fecha de Nacimiento': formatDate(client.fechaNacimiento),
    'Tipo de Documento': getDocumentTypeLabel(client.tipoDocumento),
    'Nro. Documento': client.numeroDocumento,
  }));

  const csv = Papa.unparse(csvData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `clientes_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};