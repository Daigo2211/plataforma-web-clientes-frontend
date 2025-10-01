import { DOCUMENT_VALIDATIONS, FILE_VALIDATIONS } from '@/constants';

export const validateDocumentNumber = (
  tipoDocumento: 'DNI' | 'RUC' | 'CARNET_EXTRANJERIA',
  nroDocumento: string
): string | true => {
  const validation = DOCUMENT_VALIDATIONS[tipoDocumento];

  if (!nroDocumento) {
    return 'El número de documento es obligatorio';
  }

  if (!validation.pattern.test(nroDocumento)) {
    return validation.errorMessage;
  }

  return true;
};

export const validateFile = (
  file: File | null,
  type: 'pdf' | 'image'
): string | true => {
  if (!file) {
    return 'El archivo es obligatorio';
  }

  if (type === 'pdf') {
    if (!(FILE_VALIDATIONS.ALLOWED_PDF_TYPES as readonly string[]).includes(file.type)) {
      return 'Solo se permiten archivos PDF';
    }
    if (file.size > FILE_VALIDATIONS.PDF_MAX_SIZE) {
      return `El archivo no debe exceder ${FILE_VALIDATIONS.PDF_MAX_SIZE_MB}MB`;
    }
  }

  if (type === 'image') {
    if (!(FILE_VALIDATIONS.ALLOWED_IMAGE_TYPES as readonly string[]).includes(file.type)) {
      return 'Solo se permiten archivos JPG/JPEG';
    }
  }

  return true;
};