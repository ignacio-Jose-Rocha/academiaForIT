# Task Manager - Academia For IT

Una aplicación moderna de gestión de tareas con React frontend y Express backend, diseñada para ser simple, elegante y funcional.

## 📸 Capturas de Pantalla

### Vista Principal - Dashboard
![Dashboard Principal](./screenshots/dashboard.png)
*Vista principal con lista de tareas, estadísticas y filtros*

### Crear Nueva Tarea
![Crear Tarea](./screenshots/create-task.png)
*Formulario para crear nuevas tareas con validación*

### Detalle de Tarea
![Detalle de Tarea](./screenshots/task-detail.png)
*Vista detallada de una tarea individual*

### Búsqueda y Filtros
![Búsqueda y Filtros](./screenshots/search-filters.png)
*Funcionalidad de búsqueda en tiempo real y filtros por estado*

### Diseño Responsive - Móvil
![Vista Móvil](./screenshots/mobile-view.png)
*Diseño adaptativo para dispositivos móviles*

## 🚀 Inicio Rápido - Ejecutar Localmente

### Opción 1: Solo Frontend (Recomendado para pruebas rápidas)

1. **Clonar y navegar**
```bash
git clone <repository-url>
cd academiaForIT/frontend
```

2. **Instalar y ejecutar**
```bash
npm install
npm run dev
```

3. **Abrir en navegador**
- Ir a `http://localhost:5174`
- ¡La aplicación funciona con datos de ejemplo! 🎉

### Opción 2: Frontend + Backend (Aplicación completa)

1. **Iniciar Backend** (Terminal 1)
```bash
cd backend
npm install
npm run dev
```

2. **Iniciar Frontend** (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```

3. **Usar la aplicación**
- Frontend: `http://localhost:5174`
- Backend API: `http://localhost:3001`

## 📁 Estructura del Proyecto

```
academiaForIT/
├── backend/          # API REST con Express y SQLite
├── frontend/         # Aplicación React con Vite
└── README.md         # Este archivo
```

## ✨ Características

### Funcionalidades Principales
- ✅ **CRUD Completo**: Crear, leer, actualizar y eliminar tareas
- ✅ **Búsqueda Avanzada**: Buscar por título y descripción en tiempo real
- ✅ **Filtros Inteligentes**: Ver todas, pendientes o completadas
- ✅ **Validación de Formularios**: Campos requeridos y mensajes de error
- ✅ **Dashboard de Estadísticas**: Contadores en tiempo real
- ✅ **Navegación SPA**: React Router para navegación fluida

### Experiencia de Usuario
- 📱 **Diseño Responsive**: Funciona en desktop, tablet y móvil
- 🎨 **CSS Puro Elegante**: Estilos modernos sin frameworks externos
- ⚡ **Rendimiento Optimizado**: Carga rápida y navegación suave
- 🚀 **Interfaz Intuitiva**: Fácil de usar y navegar

## 🛠️ Tecnologías

### Frontend
- **React 19** - Framework moderno con hooks
- **Vite** - Build tool ultrarrápido con HMR
- **React Router DOM** - Navegación SPA
- **CSS Puro** - Estilos elegantes sin frameworks externos
- **JavaScript ES6+** - Código moderno y limpio

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web minimalista
- **SQLite3** - Base de datos ligera
- **CORS** - Configuración de recursos cruzados
- **Joi** - Validación de esquemas
- **UUID** - Generación de IDs únicos
- **Nodemon** - Desarrollo con auto-restart

## 🎯 Cómo Usar la Aplicación

1. **📋 Ver Tareas**: La página principal muestra todas las tareas con estadísticas
2. **🔍 Buscar**: Usa la barra de búsqueda para encontrar tareas específicas
3. **🔽 Filtrar**: Botones para ver solo pendientes o completadas
4. **➕ Crear**: Haz clic en "Nueva Tarea" para agregar una tarea
5. **✅ Completar**: Checkbox para marcar tareas como completadas
6. **✏️ Editar**: Botón "Editar" para modificar tareas existentes
7. **👁️ Ver Detalle**: Clic en el título para ver detalles completos
8. **🗑️ Eliminar**: Botón "Eliminar" con confirmación de seguridad

## 🔧 Comandos de Desarrollo

### Frontend
```bash
cd frontend
npm install          # Instalar dependencias
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Vista previa del build
npm run lint         # Análisis de código
```

### Backend
```bash
cd backend
npm install          # Instalar dependencias
npm run dev          # Desarrollo con nodemon
npm start            # Producción
npm test             # Ejecutar tests (si están configurados)
```

## 🌐 URLs de la Aplicación

- **Frontend**: `http://localhost:5174` (o puerto asignado por Vite)
- **Backend API**: `http://localhost:3001`
- **Health Check**: `http://localhost:3001/health`

## API Endpoints

- `GET /api/tasks` - Obtener todas las tareas
- `POST /api/tasks` - Crear una nueva tarea
- `PUT /api/tasks/:id` - Actualizar una tarea existente
- `DELETE /api/tasks/:id` - Eliminar una tarea
- `GET /api/tasks/stats` - Obtener estadísticas de tareas
- `GET /health` - Verificar estado del servidor

## Estructura de una Tarea

```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "completed": "boolean",
  "createdAt": "datetime"
}
```

## Variables de Entorno

### Backend (.env)
```
PORT=3001
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001
```

## 🔍 Solución de Problemas

### Puerto en Uso
Si el puerto está ocupado, Vite usará automáticamente el siguiente disponible (5174, 5175, etc.).

### Problemas de Node.js
Verifica la versión: `node --version` (debe ser v16 o superior)

### Limpiar Caché
```bash
# Frontend
cd frontend && npm run dev -- --force

# Backend
cd backend && rm -rf node_modules && npm install
```

### Base de Datos
Si hay problemas con SQLite, elimina el archivo `database.sqlite` en la carpeta backend y reinicia el servidor.

## 🚀 Despliegue

### Frontend (Aplicación Estática)
```bash
cd frontend
npm run build
# Subir la carpeta 'dist' a Vercel, Netlify, etc.
```

### Backend (Servidor Node.js)
```bash
cd backend
npm start
# Desplegar en Heroku, Railway, DigitalOcean, etc.
```

## 📖 Documentación Adicional

- **Frontend**: Ver [frontend/README.md](./frontend/README.md) para detalles específicos
- **Backend**: Ver [backend/README.md](./backend/README.md) para documentación de la API

## 📸 Agregar Capturas de Pantalla

Las capturas de pantalla se almacenan en la carpeta `screenshots/`. Para agregar o actualizar:

1. **Ejecutar la aplicación localmente**
```bash
cd frontend && npm run dev
```

2. **Tomar capturas según la guía**
- Ver [screenshots/README.md](./screenshots/README.md) para especificaciones detalladas
- Usar resolución Full HD (1920x1080)
- Formato PNG para mejor calidad
- Incluir vista móvil usando DevTools

3. **Capturas requeridas**:
   - `dashboard.png` - Vista principal completa
   - `create-task.png` - Formulario de creación
   - `task-detail.png` - Vista detallada de tarea
   - `search-filters.png` - Búsqueda y filtros activos
   - `mobile-view.png` - Vista responsive móvil
   - `task-states.png` - Estados de tareas

4. **Optimizar imágenes**
   - Comprimir para web (máximo 2MB cada una)
   - Mantener calidad legible
   - Usar nombres exactos especificados

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature-name`
3. Realiza tus cambios (sin comentarios en el código)
4. Agrega capturas de pantalla si modificas la UI
5. Commit: `git commit -m "Descripción clara"`
6. Push: `git push origin feature-name`
7. Crea un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

**¡Disfruta gestionando tus tareas de manera eficiente! 🎯**