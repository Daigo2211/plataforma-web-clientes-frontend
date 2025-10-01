export const DOCUMENT_TYPES = [
  { value: 'DNI', label: 'DNI' },
  { value: 'RUC', label: 'RUC' },
  { value: 'CARNET_EXTRANJERIA', label: 'Carnet de Extranjería' },
] as const;

export const DOCUMENT_VALIDATIONS = {
  DNI: {
    length: 8,
    pattern: /^\d{8}$/,
    errorMessage: 'DNI debe tener exactamente 8 dígitos',
  },
  RUC: {
    length: 11,
    pattern: /^\d{11}$/,
    errorMessage: 'RUC debe tener exactamente 11 dígitos',
  },
  CARNET_EXTRANJERIA: {
    minLength: 9,
    maxLength: 12,
    pattern: /^[A-Z0-9]{9,12}$/,
    errorMessage: 'Carnet de extranjería debe tener entre 9 y 12 caracteres alfanuméricos',
  },
} as const;

export const FILE_VALIDATIONS = {
  PDF_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  PDF_MAX_SIZE_MB: 5,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg'],
  ALLOWED_PDF_TYPES: ['application/pdf'],
} as const;