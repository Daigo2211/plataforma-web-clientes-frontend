import Grid from '@mui/material/Grid';
import { TextField, MenuItem } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { DOCUMENT_TYPES } from '@/constants';
import { validateDocumentNumber } from '@/utils';

interface DocumentFieldsProps {
  control: Control<any>;
  errors: any;
  isEditMode: boolean;
  watchTipoDocumento: 'DNI' | 'RUC' | 'CARNET_EXTRANJERIA';
}

export const DocumentFields = ({
  control,
  errors,
  isEditMode,
  watchTipoDocumento,
}: DocumentFieldsProps) => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Controller
          name="tipoDocumento"
          control={control}
          rules={{ required: 'Tipo de documento es obligatorio' }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Tipo de Documento"
              fullWidth
              disabled={isEditMode}
              error={!!errors.tipoDocumento}
              helperText={
                errors.tipoDocumento?.message ||
                (isEditMode ? 'No se puede cambiar en modo edición' : '')
              }
              required
            >
              {DOCUMENT_TYPES.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <Controller
          name="numeroDocumento"
          control={control}
          rules={{
            required: 'Número de documento es obligatorio',
            validate: value =>
              validateDocumentNumber(watchTipoDocumento, value),
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Número de Documento"
              fullWidth
              disabled={isEditMode}
              error={!!errors.numeroDocumento}
              helperText={
                errors.numeroDocumento?.message ||
                (isEditMode ? 'No se puede cambiar en modo edición' : '')
              }
              required
            />
          )}
        />
      </Grid>
    </Grid>
  );
};