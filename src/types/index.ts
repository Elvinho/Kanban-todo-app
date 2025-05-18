export type Task = {
    id: string;
    text: string;
    status: 'todo' | 'in-progress' | 'done';
    type: 'task' | 'bug' | 'epic' | 'subtask'
  };