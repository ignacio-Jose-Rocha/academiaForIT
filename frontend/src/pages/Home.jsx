import { useTasks } from '../hooks/useTasks';
import TaskList from '../components/TaskList';

const Home = () => {
  const { tasks, loading, error, updateTask, deleteTask } = useTasks();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <p className="mt-2 text-gray-600">
          Manage your tasks efficiently with our simple task management system.
        </p>
      </div>

      <TaskList
        tasks={tasks}
        loading={loading}
        error={error}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
      />
    </div>
  );
};

export default Home;
