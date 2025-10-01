# Sistema de Gestión de Clientes - Frontend

Aplicación web para gestionar un catálogo de clientes con información personal, documentos de identidad y archivos adjuntos.

## Stack Técnico

- **React 19** con TypeScript
- **Vite 7** como build tool
- **Material UI v7** para componentes UI
- **React Hook Form 19** para manejo de formularios
- **Axios 1.12.2** para peticiones HTTP

## Características

- ✅ CRUD completo de clientes
- ✅ Validación de formularios con React Hook Form
- ✅ Carga de archivos (PDF para CV, imágenes para foto)
- ✅ Preview de imágenes en tiempo real
- ✅ Drag & drop para archivos
- ✅ Diseño responsive (desktop y mobile)
- ✅ Skeleton loading states
- ✅ Export de datos a CSV
- ✅ Eliminado lógico con confirmación
- ✅ Tema personalizado con Material UI

## Requisitos Previos

- Node.js >= 18.x
- npm o yarn
- Backend API corriendo (ver repositorio backend)

## Instalación
```bash
# Clonar el repositorio
git clone <url-del-repo>
cd cliente-catalog-frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env