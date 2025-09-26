import React, { useState } from 'react';
import './App.css';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import Stats from './components/Stats';
import FilterButtons from './components/FilterButtons';
import { useTasks } from './hooks/useTasks';

function App() {
  const [filter, setFilter] = useState('all');
  const { tasks, loading, addTask, toggleTask, deleteTask } = useTasks();

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.isCompleted;
    if (filter === 'pending') return !task.isCompleted;
    if (filter === 'high') return task.priority === 'High';
    if (filter === 'medium') return task.priority === 'Medium';
    if (filter === 'low') return task.priority === 'Low';
    return true;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.isCompleted).length,
    pending: tasks.filter(t => !t.isCompleted).length,
    highPriority: tasks.filter(t => t.priority === 'High' && !t.isCompleted).length
  };

  if (loading) return <div className="loading">Загрузка...</div>;

  return (
    <div className="app">
      <header className="header">
        <h1>Task Manager</h1>
      </header>
      
      <main className="main">
        <Stats stats={stats} />

        <div className="content">
          <div className="sidebar">
            <FilterButtons filter={filter} setFilter={setFilter} />
            <AddTaskForm onAdd={addTask} />
          </div>
          
          <TaskList 
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </div>
      </main>
    </div>
  );
}


export default App;
