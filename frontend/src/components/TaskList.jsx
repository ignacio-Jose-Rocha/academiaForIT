import { useState, useMemo } from 'react';
import TaskItem from './TaskItem';
import SearchBar from './SearchBar';
import FilterButtons from './FilterButtons';

const TaskList = ({ tasks, loading, error, onUpdateTask, onDeleteTask }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case 'completed':
        filtered = filtered.filter(task => task.completed);
        break;
      case 'pending':
        filtered = filtered.filter(task => !task.completed);
        break;
      default:
        break;
    }

    return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [tasks, searchQuery, filter]);

  const taskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [tasks]);

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
            <h3 style={{ fontWeight: '500', marginBottom: '0.25rem', color: '#991b1b' }}>Error loading tasks</h3>
            <p style={{ fontSize: '0.875rem', color: '#991b1b' }}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="card">
        <div className="card-body">
          <h2 className="text-lg font-semibold mb-4">Task Statistics</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div className="card" style={{ textAlign: 'center' }}>
              <div className="card-body">
                <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem', color: '#2563eb' }}>
                  {taskStats.total}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '500' }}>
                  Total
                </div>
              </div>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div className="card-body">
                <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem', color: '#059669' }}>
                  {taskStats.completed}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '500' }}>
                  Completed
                </div>
              </div>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div className="card-body">
                <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem', color: '#d97706' }}>
                  {taskStats.pending}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '500' }}>
                  Pending
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Tasks</h2>
            </div>
            <div className="flex flex-col gap-4">
              <SearchBar onSearch={setSearchQuery} />
              <FilterButtons activeFilter={filter} onFilterChange={setFilter} />
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <div style={{ fontSize: '3rem', margin: '0 auto 1rem', color: '#94a3b8' }}>📋</div>
              <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#0f172a', marginBottom: '0.25rem' }}>
                No tasks found
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                {searchQuery || filter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by creating a new task.'
                }
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={onUpdateTask}
                  onDelete={onDeleteTask}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
