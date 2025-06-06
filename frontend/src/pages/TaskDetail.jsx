import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import { useTasks } from '../hooks/useTasks';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { updateTask, deleteTask } = useTasks();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const response = await apiService.getTaskById(id);
        setTask(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

  const handleToggleComplete = async () => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(id, updatedTask);
      setTask(updatedTask);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        navigate('/');
      } catch (err) {
        console.error('Error deleting task:', err);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div style={{
          width: '2rem',
          height: '2rem',
          border: '2px solid #e2e8f0',
          borderTop: '2px solid #2563eb',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        backgroundColor: '#fee2e2',
        border: '1px solid #fecaca',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem'
      }}>
        <div className="flex gap-3">
          <div style={{ color: '#dc2626', flexShrink: 0 }}>⚠️</div>
          <div>
            <h3 style={{ fontWeight: '500', marginBottom: '0.25rem', color: '#991b1b' }}>Error loading task</h3>
            <p style={{ fontSize: '0.875rem', color: '#991b1b' }}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="text-center py-12">
        <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#0f172a', marginBottom: '0.25rem' }}>
          Task not found
        </h3>
        <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>
          The task you're looking for doesn't exist.
        </p>
        <Link to="/" style={{ color: '#2563eb' }}>
          Back to tasks
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/" style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: '500' }}>
          ← Back to tasks
        </Link>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <button
                onClick={handleToggleComplete}
                style={{
                  marginTop: '0.25rem',
                  width: '1.5rem',
                  height: '1.5rem',
                  border: `2px solid ${task.completed ? '#059669' : '#cbd5e1'}`,
                  borderRadius: '4px',
                  backgroundColor: task.completed ? '#059669' : 'transparent',
                  color: task.completed ? 'white' : 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {task.completed && '✓'}
              </button>
              <div>
                <h1 style={{
                  fontSize: '1.875rem',
                  fontWeight: '700',
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? '#64748b' : '#0f172a'
                }}>
                  {task.title}
                </h1>
                <div className="mt-2 flex items-center gap-4">
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    backgroundColor: task.completed ? '#d1fae5' : '#fef3c7',
                    color: task.completed ? '#065f46' : '#92400e'
                  }}>
                    {task.completed ? 'Completed' : 'Pending'}
                  </span>
                  <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                    Created: {formatDate(task.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={`/edit/${task.id}`}
                className="btn btn-secondary btn-sm"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          </div>

          {task.description && (
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem' }}>Description</h2>
              <p style={{
                color: task.completed ? '#64748b' : '#334155',
                whiteSpace: 'pre-wrap'
              }}>
                {task.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
