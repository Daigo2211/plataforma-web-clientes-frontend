import { useRef, useState } from 'react';
import { Box, Typography, Alert, Paper, Avatar } from '@mui/material';
import { CloudUpload, InsertDriveFile, Image as ImageIcon } from '@mui/icons-material';
import { validateFile } from '@/utils';
import { API_URL } from '@/services';

interface FileUploadFieldProps {
  label: string;
  accept: string;
  fileType: 'pdf' | 'image';
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  currentFileUrl?: string;
  required?: boolean;
}

export const FileUploadField = ({
  label,
  accept,
  fileType,
  value,
  onChange,
  error,
  currentFileUrl,
  required = true,
}: FileUploadFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const processFile = (file: File) => {
    const validation = validateFile(file, fileType);
    if (validation !== true) {
      setValidationError(validation);
      onChange(null);
      setPreviewUrl(null);
      return;
    }

    setValidationError(null);
    onChange(file);

    if (fileType === 'image') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const displayError = validationError || error;

  const getIcon = () => {
    if (fileType === 'image') {
      return <ImageIcon sx={{ fontSize: 48, color: 'primary.main' }} />;
    }
    return <InsertDriveFile sx={{ fontSize: 48, color: 'error.main' }} />;
  };

  const getAcceptText = () => {
    if (fileType === 'image') return 'JPG, JPEG (máx 2MB)';
    return 'PDF (máx 5MB)';
  };

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
        {label} {required && <span style={{ color: '#d32f2f' }}>*</span>}
      </Typography>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <Paper
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        elevation={0}
        sx={{
          border: '2px dashed',
          borderColor: isDragging ? 'primary.main' : displayError ? 'error.main' : 'divider',
          borderRadius: 2,
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: isDragging ? 'primary.light' : 'background.paper',
          transition: 'all 0.2s',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: 'action.hover',
          },
        }}
      >
        {previewUrl && fileType === 'image' ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Avatar
              src={previewUrl}
              sx={{
                width: 120,
                height: 120,
                border: '3px solid',
                borderColor: 'primary.main',
              }}
            />
            <Typography variant="body2" color="text.secondary">
              Haz clic para cambiar la imagen
            </Typography>
          </Box>
        ) : value ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <InsertDriveFile sx={{ fontSize: 48, color: 'success.main' }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {value.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Haz clic para cambiar
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                bgcolor: isDragging ? 'primary.main' : 'grey.100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1,
                transition: 'all 0.2s',
              }}
            >
              <CloudUpload sx={{ fontSize: 32, color: isDragging ? 'white' : 'primary.main' }} />
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {isDragging ? 'Suelta el archivo aquí' : 'Arrastra y suelta o haz clic'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {getAcceptText()}
            </Typography>
          </Box>
        )}
      </Paper>

      {currentFileUrl && !value && (
        <Alert severity="info" sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {fileType === 'image' ? (
              <Avatar
                src={`${API_URL}${currentFileUrl}`}
                sx={{ width: 32, height: 32 }}
              />
            ) : (
              <InsertDriveFile fontSize="small" />
            )}
            <Typography variant="body2">
              Archivo actual: {currentFileUrl.split('/').pop()}
            </Typography>
          </Box>
        </Alert>
      )}

      {displayError && (
        <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
          {displayError}
        </Typography>
      )}
    </Box>
  );
};