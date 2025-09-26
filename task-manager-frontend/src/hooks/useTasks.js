import { useState, useEffect } from 'react';
import { taskApi } from '../services/taskApi';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await taskApi.getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error('Ошибка при загрузке задач:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title, description, priority) => {
    try {
      const newTask = await taskApi.createTask(title, description, priority);
      setTasks(prev => [...prev, newTask]);
    } catch (error) {
      console.error('Ошибка при создании задачи:', error);
    }
  };

  const toggleTask = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    try {
      const updatedTask = await taskApi.updateTask(id, { ...task, isCompleted: !task.isCompleted });
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
    } catch (error) {
      console.error('Ошибка при обновлении задачи:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskApi.deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  return {
    tasks,
    loading,
    loadTasks,
    addTask,
    toggleTask,
    deleteTask
  };
};
