import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleTheme }) => {
  return (
    <nav className={darkMode ? "bg-gray-800 p-4" : "bg-[#1d599c] p-4"}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white font-bold">
            Home
          </Link>
          <Link to="/tasks" className="text-white font-bold">
            Tasks
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <img src="/dinelco-white.svg" alt="Logo" className="h-8" />
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/add-task" className="text-white font-bold">
            Add Task
          </Link>
          <button
            onClick={toggleTheme}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
