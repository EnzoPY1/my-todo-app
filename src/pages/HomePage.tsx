import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to the TODO App</h1>
      <p className="text-lg mb-6">Manage your tasks efficiently and easily.</p>
      <Link
        to="/tasks"
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
      >
        View Tasks
      </Link>
    </div>
  );
};

export default HomePage;
