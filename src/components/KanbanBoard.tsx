// src/components/KanbanBoard.tsx
import React, { useEffect, useState } from 'react';
import { Column } from './Column';
import { Task } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { TaskModal } from './TaskModal';

export const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    type: 'task'
  });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('kanban-tasks');
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.title.trim()) return;
    setTasks(prev => [
      ...prev,
      {
        id: uuidv4(),
        title: newTask.title,
        description: newTask.description,
        type: newTask.type as Task['type'],
        status: 'todo'
      }
    ]);
    setNewTask({ title: '', description: '', type: 'task' });
  };

  const removeTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Kanban Board</h1>
      <div style={{ display: 'flex', marginBottom: '1rem', gap: '0.5rem' }}>
        <input
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Título da tarefa"
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <select
          value={newTask.type}
          onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
        >
          <option value="task">Task</option>
          <option value="bug">Bug</option>
          <option value="epic">Epic</option>
          <option value="subtask">Subtask</option>
        </select>
        <input
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Descrição"
          style={{ flex: 2, padding: '0.5rem' }}
        />
        <button onClick={addTask}>Adicionar</button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Column
          title="A Fazer"
          status="todo"
          tasks={tasks.filter(t => t.status === 'todo')}
          onDropTask={updateTaskStatus}
          onRemove={removeTask}
          onSelect={setSelectedTask}
        />
        <Column
          title="Em Progresso"
          status="in-progress"
          tasks={tasks.filter(t => t.status === 'in-progress')}
          onDropTask={updateTaskStatus}
          onRemove={removeTask}
          onSelect={setSelectedTask}
        />
        <Column
          title="Concluído"
          status="done"
          tasks={tasks.filter(t => t.status === 'done')}
          onDropTask={updateTaskStatus}
          onRemove={removeTask}
          onSelect={setSelectedTask}
        />
      </div>

      {selectedTask && (
        <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
};
