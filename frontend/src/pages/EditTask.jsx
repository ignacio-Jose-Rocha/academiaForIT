import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import TaskForm from '../components/TaskForm';
import apiService from '../services/api';

const EditTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateTask } = useTasks();

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

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await updateTask(id, formData);
    } finally {
      setIsSubmitting(false);
    }
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
        <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
          The task you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Task</h1>
        <p className="mt-2 text-gray-600">
          Update the details of your task.
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <TaskForm task={task} onSubmit={handleSubmit} isLoading={isSubmitting} />
        </div>
      </div>
    </div>
  );
};

export default EditTask;
