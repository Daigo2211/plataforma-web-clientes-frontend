export interface Client {
  id: number; 
  nombres: string;
  apellidos: string;
  nombreCompleto?: string; 
  fechaNacimiento: string;
  tipoDocumento: 'DNI' | 'RUC' | 'CARNET_EXTRANJERIA';
  numeroDocumento: string; 
  rutaHojaVida?: string; 
  rutaFoto?: string; 
  fechaCreacion?: string;
}

export interface CreateClientDto {
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  tipoDocumento: 'DNI' | 'RUC' | 'CARNET_EXTRANJERIA';
  numeroDocumento: string; 
  hojaVida: File;
  foto: File;
}

export interface UpdateClientDto {
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  hojaVida?: File;
  foto?: File;
}

export interface ClientFormInput {
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  tipoDocumento: 'DNI' | 'RUC' | 'CARNET_EXTRANJERIA';
  numeroDocumento: string;
  hojaVida: File | null;
  foto: File | null;
}

export interface ApiResponse<T> {
  isSuccess: boolean; 
  data: T;
  message?: string;
  errors?: string[]; 
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}