import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useTaskStore from '../store/taskStore';
import TaskCard from '../components/TaskCard';

interface TasksPageProps {
  darkMode: boolean;
}

const TasksPage: React.FC<TasksPageProps> = ({ darkMode }) => {
  const { tasks, loadInitialTasks } = useTaskStore();
  const location = useLocation();
  const [success, setSuccess] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<'date' | 'alphabetical'>('date');
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const [tasksToLoad, setTasksToLoad] = useState(1);

  useEffect(() => {
    if (location.state && location.state.success) {
      setSuccess(location.state.success);
      setTimeout(() => setSuccess(null), 3000);
    }
  }, [location]);

  // Filtrar tareas
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === 'all' ||
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed);
    return matchesSearch && matchesFilter;
  });

  // Ordenar tareas
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    }
    return order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
  });

  // Paginación
  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const currentTasks = sortedTasks.slice(startIndex, startIndex + tasksPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const pageNumbers = [];
  const maxPagesToShow = 5;
  const halfPagesToShow = Math.floor(maxPagesToShow / 2);
  let startPage = Math.max(currentPage - halfPagesToShow, 1);
  let endPage = Math.min(currentPage + halfPagesToShow, totalPages);

  if (currentPage - halfPagesToShow < 1) {
    endPage = Math.min(1 + maxPagesToShow - 1, totalPages);
  } else if (currentPage + halfPagesToShow > totalPages) {
    startPage = Math.max(totalPages - maxPagesToShow + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Función para manejar la carga de tareas desde la API
  const handleLoadTasks = () => {
    loadInitialTasks(tasksToLoad);
  };

  return (
    <div className="p-4 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold" style={{ color: darkMode ? 'white' : 'black' }}>
          Tus Tareas
        </h1>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="1"
            value={tasksToLoad}
            onChange={(e) => setTasksToLoad(Number(e.target.value))}
            className="w-16 p-2 border rounded text-black"
          />
          <button
            onClick={handleLoadTasks}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Cargar Tareas
          </button>
        </div>
      </div>
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <input
        type="text"
        placeholder="Busca tus tareas..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={darkMode ? 'w-full p-2 mb-4 bg-gray-700 text-white rounded' : 'w-full p-2 mb-4 bg-[#1d599c] text-white rounded'}
      />
      <div className="flex mb-4 space-x-2">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'all' | 'completed' | 'pending')}
          className={darkMode ? 'bg-gray-700 text-white p-2 rounded' : 'bg-[#1d599c] text-white p-2 rounded'}
        >
          <option value="all">Todos</option>
          <option value="completed">Completados</option>
          <option value="pending">Pendientes</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'alphabetical')}
          className={darkMode ? 'bg-gray-700 text-white p-2 rounded' : 'bg-[#1d599c] text-white p-2 rounded'}
        >
          <option value="date">Fecha y Hora</option>
          <option value="alphabetical">Alfabético</option>
        </select>
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}
          className={darkMode ? 'bg-gray-700 text-white p-2 rounded' : 'bg-[#1d599c] text-white p-2 rounded'}
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {currentTasks.map((task, index) => (
          <TaskCard key={`${task.id}-${index}`} task={task} darkMode={darkMode} />
        ))}
      </div>
      <div className="mt-4 flex justify-center space-x-2">
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(1)}
            className="px-4 py-2 rounded bg-blue-500 text-white"
          >
            First
          </button>
        )}

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded ${
              currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
            }`}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(totalPages)}
            className="px-4 py-2 rounded bg-blue-500 text-white"
          >
            Last
          </button>
        )}
      </div>
    </div>
  );
};

export default TasksPage;
