import { Link } from 'react-router-dom';

const TaskItem = ({ task, onToggleComplete, onDelete }) => {
  const handleToggleComplete = () => {
    onToggleComplete(task.id, { ...task, completed: !task.completed });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="flex gap-4">
          <button
            onClick={handleToggleComplete}
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
              marginTop: '0.125rem'
            }}
          >
            {task.completed && '✓'}
          </button>

          <div className="flex-1">
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
            <p style={{
              fontSize: '0.75rem',
              color: '#94a3b8'
            }}>
              Created: {formatDate(task.createdAt)}
            </p>
          </div>

          <div className="flex gap-2">
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
      </div>
    </div>
  );
};

export default TaskItem;
