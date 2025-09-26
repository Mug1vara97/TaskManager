import React from 'react';

function FilterButtons({ filter, setFilter }) {
  return (
    <div className="filters">
      <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>Все</button>
      <button onClick={() => setFilter('pending')} className={filter === 'pending' ? 'active' : ''}>Активные</button>
      <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Выполненные</button>
    </div>
  );
}

export default FilterButtons;
