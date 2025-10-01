import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useForm, Controller } from 'react-hook-form';
import { Client, ClientFormInput } from '@/types';
import { FileUploadField } from './FileUploadField';
import { DocumentFields } from './DocumentFields';
import { formatDateForInput } from '@/utils';

interface ClientFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>; 
  client?: Client | null;
  loading?: boolean;
}

export const ClientForm = ({ open, onClose, onSubmit, client, loading }: ClientFormProps) => {
  const isEditMode = !!client;
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ClientFormInput>({ // ← Usa ClientFormInput
    defaultValues: {
      nombres: '',
      apellidos: '',
      fechaNacimiento: '',
      tipoDocumento: 'DNI',
      numeroDocumento: '',
      hojaVida: null,
      foto: null,
    },
  });

  const watchTipoDocumento = watch('tipoDocumento');

  useEffect(() => {
    if (client) {
      reset({
        nombres: client.nombres,
        apellidos: client.apellidos,
        fechaNacimiento: formatDateForInput(client.fechaNacimiento),
        tipoDocumento: client.tipoDocumento,
        numeroDocumento: client.numeroDocumento,
        hojaVida: null,
        foto: null,
      });
    } else {
      reset({
        nombres: '',
        apellidos: '',
        fechaNacimiento: '',
        tipoDocumento: 'DNI',
        numeroDocumento: '',
        hojaVida: null,
        foto: null,
      });
    }
  }, [client, reset]);

  const handleFormSubmit = async (data: ClientFormInput) => { 
    const formData = new FormData(); 

    formData.append('nombres', data.nombres);
    formData.append('apellidos', data.apellidos);
    formData.append('fechaNacimiento', data.fechaNacimiento);

    if (!isEditMode) {
      formData.append('tipoDocumento', data.tipoDocumento);
      formData.append('numeroDocumento', data.numeroDocumento);
    }

    if (data.hojaVida) {
      formData.append('hojaVida', data.hojaVida);
    }

    if (data.foto) {
      formData.append('foto', data.foto);
    }

    setSubmitting(true);
    try {
      await onSubmit(formData);
      handleClose();
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!submitting) {
      reset();
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{isEditMode ? 'Editar Cliente' : 'Crear Cliente'}</DialogTitle>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="nombres"
                  control={control}
                  rules={{ required: 'Nombres es obligatorio' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Nombres"
                      fullWidth
                      error={!!errors.nombres}
                      helperText={errors.nombres?.message}
                      required
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="apellidos"
                  control={control}
                  rules={{ required: 'Apellidos es obligatorio' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Apellidos"
                      fullWidth
                      error={!!errors.apellidos}
                      helperText={errors.apellidos?.message}
                      required
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Controller
                  name="fechaNacimiento"
                  control={control}
                  rules={{ required: 'Fecha de nacimiento es obligatoria' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Fecha de Nacimiento"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.fechaNacimiento}
                      helperText={errors.fechaNacimiento?.message}
                      required
                    />
                  )}
                />
              </Grid>
            </Grid>

            <DocumentFields
              control={control}
              errors={errors}
              isEditMode={isEditMode}
              watchTipoDocumento={watchTipoDocumento}
            />

            <Controller
              name="hojaVida"
              control={control}
              rules={{
                validate: value => {
                  if (!isEditMode && !value) {
                    return 'La hoja de vida es obligatoria';
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <FileUploadField
                  label="Hoja de Vida (PDF)"
                  accept=".pdf"
                  fileType="pdf"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.hojaVida?.message}
                  currentFileUrl={client?.rutaHojaVida}
                  required={!isEditMode}
                />
              )}
            />

            <Controller
              name="foto"
              control={control}
              rules={{
                validate: value => {
                  if (!isEditMode && !value) {
                    return 'La foto es obligatoria';
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <FileUploadField
                  label="Foto del Cliente (JPG/JPEG)"
                  accept=".jpg,.jpeg"
                  fileType="image"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.foto?.message}
                  currentFileUrl={client?.rutaFoto}
                  required={!isEditMode}
                />
              )}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={submitting}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={submitting || loading}
          >
            {submitting ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};