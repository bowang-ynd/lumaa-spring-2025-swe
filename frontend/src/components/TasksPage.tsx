import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
  userId?: number;
}

interface TasksPageProps {
  token: string;
  onLogout: () => void;
}

const TasksPage: React.FC<TasksPageProps> = ({ token, onLogout }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // State to track which tasks have their description expanded
  const [expandedTaskIds, setExpandedTaskIds] = useState<number[]>([]);

  const fetchTasks = async () => {
    try {
      const data = await getTasks(token);
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTask(token, title, description);
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      await updateTask(token, task.id, {
        ...task,
        isComplete: !task.isComplete,
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(token, id);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleDescription = (taskId: number) => {
    if (expandedTaskIds.includes(taskId)) {
      setExpandedTaskIds(expandedTaskIds.filter(id => id !== taskId));
    } else {
      setExpandedTaskIds([...expandedTaskIds, taskId]);
    }
  };

  return (
    <div>
      <button onClick={onLogout}>Logout</button>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: '1rem' }}>
            <div>
              <span
                style={{
                  textDecoration: task.isComplete ? 'line-through' : 'none',
                  cursor: 'pointer'
                }}
                onClick={() => toggleDescription(task.id)}
              >
                {task.title}
              </span>
              {' - '}
              <button onClick={() => handleToggleComplete(task)}>
                {task.isComplete ? 'Undo' : 'Complete'}
              </button>
              {' '}
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              {' '}
              <button onClick={() => toggleDescription(task.id)}>
                {expandedTaskIds.includes(task.id) ? 'Hide Details' : 'View Details'}
              </button>
            </div>
            {expandedTaskIds.includes(task.id) && task.description && (
              <div style={{ marginTop: '0.5rem', paddingLeft: '1rem', color: '#555' }}>
                <strong>Description:</strong> {task.description}
              </div>
            )}
          </li>
        ))}
      </ul>

      <h3>Create New Task</h3>
      <form onSubmit={handleCreateTask}>
        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Task Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TasksPage;
