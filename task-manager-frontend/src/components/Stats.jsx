import React from 'react';

function Stats({ stats }) {
  return (
    <div className="stats">
      <div>Всего: {stats.total}</div>
      <div>Выполнено: {stats.completed}</div>
      <div>В работе: {stats.pending}</div>
    </div>
  );
}

export default Stats;
