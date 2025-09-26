import React from 'react';

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task ${task.isCompleted ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggle(task.id)}
      />
      <div className="task-content">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <span className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>
      <button onClick={() => onDelete(task.id)}>Удалить</button>
    </div>
  );
}

export default TaskItem;
