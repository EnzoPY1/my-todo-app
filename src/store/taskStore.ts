import { create } from 'zustand';

interface Task {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  completed: boolean;
}

interface TaskStore {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
}

const loadTasksFromLocalStorage = (): Task[] => {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const saveTasksToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const useTaskStore = create<TaskStore>((set) => ({
  tasks: loadTasksFromLocalStorage(),
  addTask: (title, description) => set((state) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      createdAt: new Date().toLocaleString(),
      completed: false
    };
    const updatedTasks = [...state.tasks, newTask];
    saveTasksToLocalStorage(updatedTasks);
    return { tasks: updatedTasks };
  }),
  toggleTask: (id) => set((state) => {
    const updatedTasks = state.tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasksToLocalStorage(updatedTasks);
    return { tasks: updatedTasks };
  }),
  removeTask: (id) => set((state) => {
    const updatedTasks = state.tasks.filter(task => task.id !== id);
    saveTasksToLocalStorage(updatedTasks);
    return { tasks: updatedTasks };
  })
}));

export default useTaskStore;
