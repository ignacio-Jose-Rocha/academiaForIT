import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskForm from '../components/TaskForm';

const CreateTask = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { createTask } = useTasks();

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      await createTask(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create New Task</h1>
        <p className="mt-2 text-gray-600">
          Add a new task to your task list.
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <TaskForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
