import React from 'react';
import { Task } from '../types';

type Props = {
  task: Task;
  onRemove: (id: string) => void;
};

export const TaskItem: React.FC<Props> = ({ task, onRemove }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', task.id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{
        borderRadius: '8px',
        padding: '0.75rem',
        marginBottom: '0.75rem',
        backgroundColor: '#fefefe',
        cursor: 'grab',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e1e1e1',
        transition: 'box-shadow 0.2s',
      }}
      
    >
      <p>{task.text}</p>
      <button
  onClick={() => onRemove(task.id)}
  style={{
    fontSize: '0.8rem',
    background: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.25rem 0.5rem',
    cursor: 'pointer',
    marginTop: '0.5rem'
  }}
>
  Excluir
</button>

    </div>
  );
};
