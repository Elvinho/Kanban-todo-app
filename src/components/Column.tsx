// src/components/Column.tsx
import React from 'react';
import { Task } from '../types';

interface ColumnProps {
  title: string;
  status: Task['status'];
  tasks: Task[];
  onDropTask: (id: string, newStatus: Task['status']) => void;
  onRemove: (id: string) => void;
  onSelectTask: (task: Task) => void;
}

export const Column: React.FC<ColumnProps> = ({ title, status, tasks, onDropTask, onRemove, onSelectTask }) => {
  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    onDropTask(taskId, status);
  };

  return (
    <div
      onDragOver={allowDrop}
      onDrop={handleDrop}
      style={{
        flex: 1,
        margin: '0 1rem',
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        minHeight: '300px',
      }}
    >
      <h2>{title}</h2>
      {tasks.map((task) => (
        <div
          key={task.id}
          draggable
          onDragStart={(e) => e.dataTransfer.setData('text/plain', task.id)}
          onClick={() => onSelectTask(task)}
          style={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '0.75rem',
            marginBottom: '0.5rem',
            cursor: 'pointer',
          }}
        >
          <strong>{task.text}</strong>
          <div style={{ fontSize: '0.8rem', color: '#666' }}>{task.type.toUpperCase()}</div>
          <button onClick={(e) => { e.stopPropagation(); onRemove(task.id); }}>Remover</button>
        </div>
      ))}
    </div>
  );
};
