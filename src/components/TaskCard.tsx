import React, { useState } from 'react';
import useTaskStore from '../store/taskStore';
import { toast } from 'react-toastify';
import ConfirmDeleteModal from './ConfirmDeleteModal';

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    completed: boolean;
  };
  darkMode: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, darkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const removeTask = useTaskStore((state) => state.removeTask);

  const handleComplete = () => {
    toggleTask(task.id);
    const message = task.completed
      ? 'Task marked as incomplete!'
      : 'Task completed successfully!';
    toast.success(message);
  };

  const handleDelete = () => {
    setIsModalOpen(false); // Cerrar el modal
    removeTask(task.id);
    toast.error('Task deleted successfully!');
  };

  return (
    <>
      <div className={`p-4 rounded flex justify-between items-center ${darkMode ? 'bg-gray-700' : 'bg-[#558cdf]'} transition-opacity duration-500`}>
        <div>
          <h2 className={`text-lg ${task.completed ? 'line-through' : ''} ${darkMode ? 'text-white' : 'text-black'}`}>
            {task.title}
          </h2>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-100'}>{task.description}</p>
          <p className={darkMode ? 'text-black text-xs' : 'text-gray-300 text-xs'}>{task.createdAt}</p>
        </div>
        <div className="space-x-2">
          <button
            onClick={handleComplete}
            className="text-sm bg-green-600 px-2 py-1 rounded text-white hover:bg-green-700"
          >
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button
            onClick={() => setIsModalOpen(true)} // Abrir el modal al hacer clic
            className="text-sm bg-red-600 px-2 py-1 rounded text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Cerrar el modal sin eliminar
        onConfirm={handleDelete} // Confirmar y eliminar la tarea
      />
    </>
  );
};

export default TaskCard;
