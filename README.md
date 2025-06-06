# Task Manager

Una app sencilla para gestionar tareas que hice como proyecto de práctica. Funciona con React en el frontend y tiene un backend en Express, aunque también puedes usarla solo con el frontend.

## Capturas

### Pantalla principal
![Dashboard Principal](./screenshots/dashboard.png)

### Crear tarea
![Crear Tarea](./screenshots/create-task.png)

### Ver detalle
![Detalle de Tarea](./screenshots/task-detail.png)

### Buscar y filtrar
![Búsqueda y Filtros](./screenshots/search-filters.png)

### En el móvil
![Vista Móvil](./screenshots/mobile-view.png)

## Cómo ejecutarlo

### Opción rápida (solo frontend)

Si solo quieres ver cómo funciona:

```bash
git clone <repository-url>
cd academiaForIT/frontend
npm install
npm run dev
```

Abre `http://localhost:5174` y ya está. Viene con datos de ejemplo para que puedas probar todo.

### Opción completa (con backend)

Si quieres la app completa con base de datos:

**Terminal 1:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2:**
```bash
cd frontend
npm install
npm run dev
```

Después ve a `http://localhost:5174`

## Qué hace

Básicamente es un gestor de tareas donde puedes:

- Crear, editar y borrar tareas
- Marcarlas como completadas
- Buscar entre tus tareas
- Filtrar por pendientes o completadas
- Ver estadísticas básicas

Lo hice sin usar librerías de CSS (como Bootstrap o Tailwind), solo CSS puro para practicar.

## Estructura

```
academiaForIT/
├── backend/          # API con Express
├── frontend/         # App de React
└── README.md
```

## Tecnologías

**Frontend:**
- React 19 con hooks
- Vite para el desarrollo
- React Router para navegación
- CSS puro (sin frameworks)

**Backend:**
- Node.js + Express
- SQLite para la base de datos
- Algunas librerías para validación y CORS

## Cómo usarlo

Es bastante intuitivo:

1. En la página principal ves todas las tareas
2. Puedes buscar escribiendo en la barra de búsqueda
3. Los botones de filtro te dejan ver solo las pendientes o completadas
4. "Nueva Tarea" para crear una
5. Click en el checkbox para marcar como completada
6. "Editar" para modificar una tarea
7. Click en el título para ver los detalles
8. "Eliminar" para borrarla (te pide confirmación)

## Comandos útiles

**Frontend:**
```bash
cd frontend
npm run dev      # Para desarrollar
npm run build    # Para compilar
```

**Backend:**
```bash
cd backend
npm run dev      # Para desarrollar
npm start        # Para producción
```

La app del frontend suele estar en `http://localhost:5174` y la API en `http://localhost:3001`.

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

## Si algo no funciona

**Puerto ocupado:** Vite automáticamente usa otro puerto (5174, 5175, etc.)

**Problemas con Node:** Necesitas Node.js v16 o más nuevo

**Cache raro:** Borra `node_modules` y haz `npm install` de nuevo

**Base de datos:** Si el backend da problemas, borra el archivo `database.sqlite` y reinicia

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

## Capturas de pantalla

Si quieres agregar o actualizar las capturas:

1. Ejecuta la app: `cd frontend && npm run dev`
2. Toma screenshots en buena calidad (PNG preferiblemente)
3. Guárdalas en la carpeta `screenshots/` con estos nombres:
   - `dashboard.png` - Pantalla principal
   - `create-task.png` - Formulario de crear
   - `task-detail.png` - Vista de detalle
   - `search-filters.png` - Búsqueda funcionando
   - `mobile-view.png` - Vista móvil

Hay más detalles en [screenshots/README.md](./screenshots/README.md) si necesitas especificaciones exactas.

## Contribuir

Si quieres mejorar algo:

1. Haz fork del repo
2. Crea una rama para tu feature
3. Haz tus cambios
4. Si cambias la UI, actualiza las capturas
5. Haz commit y pull request

## Licencia

MIT - básicamente puedes hacer lo que quieras con el código.