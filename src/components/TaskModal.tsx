// src/components/TaskModal.tsx
import React from 'react';
import { Task } from '../types';

interface TaskModalProps {
  task: Task | null;
  onClose: () => void;
  onUpdate: (updatedTask: Task) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, onUpdate }) => {
  if (!task) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onUpdate({ ...task, [name]: value });
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Detalhes da Tarefa</h2>

        <label>
          Nome:
          <input name="text" value={task.text} onChange={handleChange} style={styles.input} />
        </label>

        <label>
          Tipo:
          <select name="type" value={task.type || ''} onChange={handleChange} style={styles.input}>
            <option value="">Selecionar tipo</option>
            <option value="task">Tarefa</option>
            <option value="bug">Bug</option>
            <option value="epic">Épico</option>
            <option value="subtask">Subtarefa</option>
          </select>
        </label>

        <label>
          Descrição:
          <textarea name="description" value={task.description || ''} onChange={handleChange} style={styles.textarea} />
        </label>

        <div style={styles.actions}>
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    width: '400px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    marginTop: '0.25rem',
    marginBottom: '1rem',
  },
  textarea: {
    width: '100%',
    padding: '0.5rem',
    height: '80px',
    marginTop: '0.25rem',
    marginBottom: '1rem',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
};
