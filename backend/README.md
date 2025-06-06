# Backend - API de Tareas

Proyecto de backend para gestión de tareas usando Express.js y SQLite3

## Instalación

```bash
npm install
npm start
```

## Base de Datos

Usa SQLite3 para persistencia. El archivo `tasks.db` se crea automáticamente.

## Endpoints

- GET /api/tasks - obtener todas las tareas
- POST /api/tasks - crear tarea nueva
- PUT /api/tasks/:id - actualizar tarea
- DELETE /api/tasks/:id - eliminar tarea
- GET /api/tasks/stats - estadísticas

## Estructura de Tarea

```javascript
{
  id: string,
  title: string,
  description: string,
  completed: boolean,
  createdAt: Date
}
```

## Ejemplos

### Crear tarea
```bash
curl -X POST http://localhost:3002/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Mi tarea", "description": "Descripción"}'
```

### Obtener tareas
```bash
curl http://localhost:3002/api/tasks
```

### Filtrar completadas
```bash
curl "http://localhost:3002/api/tasks?completed=true"
```

### Buscar tareas
```bash
curl "http://localhost:3002/api/tasks?search=proyecto"
```

## Funcionalidades

- ✅ CRUD completo de tareas
- ✅ Persistencia con SQLite3
- ✅ Filtros por estado completado
- ✅ Búsqueda por título/descripción
- ✅ Validación de datos
- ✅ Estadísticas de tareas
