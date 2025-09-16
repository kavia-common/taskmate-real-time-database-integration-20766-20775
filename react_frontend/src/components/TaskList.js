import React, { useState, useEffect } from 'react';
import { taskService } from '../services/taskService';
import TaskModal from './TaskModal';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initial fetch
    fetchTasks();

    // Subscribe to real-time updates
    const unsubscribe = taskService.subscribeToTasks(setTasks);
    return () => unsubscribe();
  }, []);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await taskService.fetchTasks();
      setTasks(fetchedTasks);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks. Please try again later.');
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await taskService.createTask(taskData);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to create task. Please try again.');
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      await taskService.updateTask(id, updates);
      setError(null);
    } catch (err) {
      setError('Failed to update task. Please try again.');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setError(null);
    } catch (err) {
      setError('Failed to delete task. Please try again.');
    }
  };

  const openModal = (task = null) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="task-list">
      {error && <div className="error-message">{error}</div>}
      
      <div className="task-list-header">
        <h2>Tasks</h2>
        <button 
          className="btn-primary" 
          onClick={() => openModal()}
        >
          Add Task
        </button>
      </div>

      <div className="task-grid">
        {tasks.map(task => (
          <div key={task.id} className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="task-card-actions">
              <button 
                className="btn-secondary"
                onClick={() => openModal(task)}
              >
                Edit
              </button>
              <button 
                className="btn-danger"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <TaskModal
          task={selectedTask}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
          }}
          onSave={async (taskData) => {
            if (selectedTask) {
              await handleUpdateTask(selectedTask.id, taskData);
            } else {
              await handleCreateTask(taskData);
            }
            setIsModalOpen(false);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
};

export default TaskList;
