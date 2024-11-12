import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTaskStore from '../store/taskStore';

const TasksFormPage: React.FC = () => {
  const navigate = useNavigate();
  const addTask = useTaskStore((state) => state.addTask);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === '' || description.trim() === '') {
      setError('Both title and description are required.');
      return;
    }
    addTask(title, description);
    navigate('/tasks', { state: { success: 'Task added successfully!' } });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-gray-800 rounded">
      <h1 className="text-2xl font-bold mb-4">Add a New Task</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 w-full py-2 rounded text-white hover:bg-blue-600 transition"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TasksFormPage;
