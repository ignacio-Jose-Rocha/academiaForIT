import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

let globalTasks = [
  { id: '1', title: 'Completar proyecto React', description: 'Finalizar la aplicación de gestión de tareas con todas las funcionalidades', completed: false, createdAt: new Date('2024-01-15').toISOString() },
  { id: '2', title: 'Revisar documentación', description: 'Leer la documentación de React Router y hooks', completed: true, createdAt: new Date('2024-01-14').toISOString() },
  { id: '3', title: 'Preparar presentación', description: 'Crear slides para la demo del proyecto', completed: false, createdAt: new Date('2024-01-16').toISOString() },
  { id: '4', title: 'Testing de la aplicación', description: 'Realizar pruebas de todas las funcionalidades', completed: false, createdAt: new Date('2024-01-17').toISOString() }
];

function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      setTasks([...globalTasks]);
      setLoading(false);
    }, 500);
  }, []);

  const toggleTaskComplete = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    globalTasks = updatedTasks;
  };

  const deleteTask = (taskId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      globalTasks = updatedTasks;
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filter === 'all' ||
                         (filter === 'completed' && task.completed) ||
                         (filter === 'pending' && !task.completed);

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length
  };

  if (loading) {
    return (
      <div>
        <h1>Task Manager</h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem' }}>
          <div style={{
            width: '2rem',
            height: '2rem',
            border: '2px solid #e2e8f0',
            borderTop: '2px solid #2563eb',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Task Manager</h1>
        <div style={{
          backgroundColor: '#fee2e2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '1rem',
          marginTop: '1rem'
        }}>
          <p style={{ color: '#991b1b' }}>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Task Manager</h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        Gestiona tus tareas de manera eficiente
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#2563eb' }}>{stats.total}</div>
          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Total</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#059669' }}>{stats.completed}</div>
          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Completadas</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#d97706' }}>{stats.pending}</div>
          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Pendientes</div>
        </div>
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>Tareas</h2>
            <Link
              to="/create"
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#2563eb',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              + Nueva Tarea
            </Link>
          </div>

          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Buscar tareas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '0.875rem'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#64748b'
                }}
              >
                ✕
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[
              { key: 'all', label: 'Todas' },
              { key: 'pending', label: 'Pendientes' },
              { key: 'completed', label: 'Completadas' }
            ].map(filterOption => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  backgroundColor: filter === filterOption.key ? '#2563eb' : 'white',
                  color: filter === filterOption.key ? 'white' : '#334155',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        {filteredTasks.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>
              {searchQuery || filter !== 'all' ? 'No se encontraron tareas' : 'No hay tareas'}
            </h3>
            <p style={{ color: '#64748b', margin: 0 }}>
              {searchQuery || filter !== 'all'
                ? 'Intenta ajustar tu búsqueda o filtros.'
                : 'Comienza creando tu primera tarea.'
              }
            </p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={toggleTaskComplete}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}

function TaskItem({ task, onToggleComplete, onDelete }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '1.5rem',
      marginBottom: '1rem',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      transition: 'all 0.2s ease'
    }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <button
          onClick={() => onToggleComplete(task.id)}
          style={{
            width: '1.25rem',
            height: '1.25rem',
            border: `2px solid ${task.completed ? '#059669' : '#cbd5e1'}`,
            borderRadius: '4px',
            backgroundColor: task.completed ? '#059669' : 'transparent',
            color: task.completed ? 'white' : 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: '0.125rem',
            transition: 'all 0.2s ease'
          }}
        >
          {task.completed && '✓'}
        </button>

        <div style={{ flex: 1 }}>
          <Link
            to={`/task/${task.id}`}
            style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: task.completed ? '#64748b' : '#0f172a',
              textDecoration: task.completed ? 'line-through' : 'none',
              display: 'block',
              marginBottom: '0.5rem'
            }}
          >
            {task.title}
          </Link>
          {task.description && (
            <p style={{
              color: task.completed ? '#94a3b8' : '#64748b',
              fontSize: '0.875rem',
              marginBottom: '0.75rem',
              lineHeight: '1.5'
            }}>
              {task.description}
            </p>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{
              fontSize: '0.75rem',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              backgroundColor: task.completed ? '#d1fae5' : '#fef3c7',
              color: task.completed ? '#065f46' : '#92400e',
              fontWeight: '500'
            }}>
              {task.completed ? 'Completada' : 'Pendiente'}
            </span>
            <span style={{
              fontSize: '0.75rem',
              color: '#94a3b8'
            }}>
              Creada: {formatDate(task.createdAt)}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Link
            to={`/edit/${task.id}`}
            style={{
              padding: '0.375rem 0.75rem',
              backgroundColor: 'white',
              color: '#334155',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '0.75rem',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
          >
            Editar
          </Link>
          <button
            onClick={() => onDelete(task.id)}
            style={{
              padding: '0.375rem 0.75rem',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

function CreateTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('El título es requerido');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const newTask = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };

      globalTasks.push(newTask);
      setIsLoading(false);
      navigate('/');
    }, 500);
  };

  return (
    <div>
      <h1>Crear Nueva Tarea</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Título *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
            placeholder="Ingresa el título de la tarea"
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Descripción
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              fontSize: '1rem',
              resize: 'vertical'
            }}
            placeholder="Descripción opcional"
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link
            to="/"
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'white',
              color: '#334155',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.875rem'
            }}
          >
            Cancelar
          </Link>
          <button
            type="submit"
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            Crear Tarea
          </button>
        </div>
      </form>
    </div>
  );
}

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Buscar la tarea
    setTimeout(() => {
      const foundTask = globalTasks.find(t => t.id === id);
      if (foundTask) {
        setTask(foundTask);
        setTitle(foundTask.title);
        setDescription(foundTask.description);
        setCompleted(foundTask.completed);
      }
      setLoading(false);
    }, 300);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('El título es requerido');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const taskIndex = globalTasks.findIndex(t => t.id === id);
      if (taskIndex !== -1) {
        globalTasks[taskIndex] = {
          ...globalTasks[taskIndex],
          title: title.trim(),
          description: description.trim(),
          completed
        };
      }
      setIsSubmitting(false);
      navigate('/');
    }, 500);
  };

  if (loading) {
    return (
      <div>
        <h1>Editar Tarea</h1>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <div style={{
            width: '2rem',
            height: '2rem',
            border: '2px solid #e2e8f0',
            borderTop: '2px solid #2563eb',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div>
        <h1>Tarea no encontrada</h1>
        <p>La tarea que buscas no existe.</p>
        <Link to="/" style={{ color: '#2563eb' }}>Volver a tareas</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Editar Tarea</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Título *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
            placeholder="Ingresa el título de la tarea"
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Descripción
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              fontSize: '1rem',
              resize: 'vertical'
            }}
            placeholder="Descripción opcional"
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              style={{ width: '1rem', height: '1rem', accentColor: '#2563eb' }}
            />
            <span style={{ fontWeight: '500' }}>Marcar como completada</span>
          </label>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link
            to="/"
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'white',
              color: '#334155',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.875rem'
            }}
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontSize: '0.875rem',
              opacity: isSubmitting ? 0.5 : 1
            }}
          >
            {isSubmitting ? 'Guardando...' : 'Actualizar Tarea'}
          </button>
        </div>
      </form>
    </div>
  );
}

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const foundTask = globalTasks.find(t => t.id === id);
      setTask(foundTask);
      setLoading(false);
    }, 300);
  }, [id]);

  const toggleComplete = () => {
    if (task) {
      const updatedTask = { ...task, completed: !task.completed };
      const taskIndex = globalTasks.findIndex(t => t.id === id);
      if (taskIndex !== -1) {
        globalTasks[taskIndex] = updatedTask;
        setTask(updatedTask);
      }
    }
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      globalTasks = globalTasks.filter(t => t.id !== id);
      navigate('/');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div>
        <div style={{ marginBottom: '1rem' }}>
          <Link to="/" style={{ color: '#2563eb', fontSize: '0.875rem' }}>← Volver a tareas</Link>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <div style={{
            width: '2rem',
            height: '2rem',
            border: '2px solid #e2e8f0',
            borderTop: '2px solid #2563eb',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div>
        <div style={{ marginBottom: '1rem' }}>
          <Link to="/" style={{ color: '#2563eb', fontSize: '0.875rem' }}>← Volver a tareas</Link>
        </div>
        <h1>Tarea no encontrada</h1>
        <p>La tarea que buscas no existe.</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: '500' }}>
          ← Volver a tareas
        </Link>
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flex: 1 }}>
            <button
              onClick={toggleComplete}
              style={{
                width: '1.5rem',
                height: '1.5rem',
                border: `2px solid ${task.completed ? '#059669' : '#cbd5e1'}`,
                borderRadius: '4px',
                backgroundColor: task.completed ? '#059669' : 'transparent',
                color: task.completed ? 'white' : 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '0.25rem'
              }}
            >
              {task.completed && '✓'}
            </button>

            <div style={{ flex: 1 }}>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: '700',
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#64748b' : '#0f172a',
                marginBottom: '1rem'
              }}>
                {task.title}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  backgroundColor: task.completed ? '#d1fae5' : '#fef3c7',
                  color: task.completed ? '#065f46' : '#92400e',
                  fontWeight: '500'
                }}>
                  {task.completed ? 'Completada' : 'Pendiente'}
                </span>
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Creada: {formatDate(task.createdAt)}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link
              to={`/edit/${task.id}`}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'white',
                color: '#334155',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              Editar
            </Link>
            <button
              onClick={handleDelete}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              Eliminar
            </button>
          </div>
        </div>

        {task.description && (
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Descripción</h2>
            <p style={{
              color: task.completed ? '#64748b' : '#334155',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap'
            }}>
              {task.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div style={{
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f8fafc',
        minHeight: '100vh'
      }}>
        <nav style={{
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <Link to="/" style={{ color: '#2563eb', marginRight: '1rem', textDecoration: 'none', fontWeight: '600' }}>
            Task Manager
          </Link>
          <Link to="/" style={{ color: '#64748b', marginRight: '1rem', textDecoration: 'none' }}>
            Tareas
          </Link>
          <Link to="/create" style={{ color: '#64748b', textDecoration: 'none' }}>
            Crear
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/edit/:id" element={<EditTask />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
