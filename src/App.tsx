import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TasksPage from "./pages/TasksPage";
import TasksFormPage from "./pages/TasksFormPage";
import Navbar from "./components/Navbar";
import useTaskStore from "./store/taskStore";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const { loadInitialTasks } = useTaskStore();

  useEffect(() => {
    loadInitialTasks(10);
  }, [loadInitialTasks]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      <BrowserRouter>
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tasks" element={<TasksPage darkMode={darkMode} />} />
            <Route path="/add-task" element={<TasksFormPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
