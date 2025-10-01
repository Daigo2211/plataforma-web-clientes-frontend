import * as XLSX from 'xlsx-js-style';
import { Client } from '@/types';
import { formatDate, getDocumentTypeLabel } from './formatters';

export const exportClientsToExcel = (clients: Client[]) => {
  const excelData = clients.map(client => ({
    'Nombres': client.nombres,
    'Apellidos': client.apellidos,
    'Fecha de Nacimiento': formatDate(client.fechaNacimiento),
    'Tipo de Documento': getDocumentTypeLabel(client.tipoDocumento),
    'Nro. Documento': client.numeroDocumento,
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  
  const columnWidths = [
    { wch: 25 },
    { wch: 25 },
    { wch: 22 },
    { wch: 20 },
    { wch: 18 },
  ];
  worksheet['!cols'] = columnWidths;

  const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
  
  for (let col = range.s.c; col <= range.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
    if (!worksheet[cellAddress]) continue;
    
    worksheet[cellAddress].s = {
      font: { 
        bold: true, 
        color: { rgb: "FFFFFF" },
        sz: 12
      },
      fill: { 
        fgColor: { rgb: "4472C4" } 
      },
      alignment: { 
        horizontal: "center", 
        vertical: "center" 
      },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } }
      }
    };
  }

  for (let row = range.s.r + 1; row <= range.e.r; row++) {
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
      if (!worksheet[cellAddress]) continue;
      
      worksheet[cellAddress].s = {
        alignment: { 
          horizontal: col === range.e.c ? "center" : "left",
          vertical: "center" 
        },
        border: {
          top: { style: "thin", color: { rgb: "D0D0D0" } },
          bottom: { style: "thin", color: { rgb: "D0D0D0" } },
          left: { style: "thin", color: { rgb: "D0D0D0" } },
          right: { style: "thin", color: { rgb: "D0D0D0" } }
        }
      };
    }
  }

  worksheet['!autofilter'] = { ref: XLSX.utils.encode_range(range) };
  worksheet['!freeze'] = { xSplit: 0, ySplit: 1 };

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');

  const fileName = `clientes_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};