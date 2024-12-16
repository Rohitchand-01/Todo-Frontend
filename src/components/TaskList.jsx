import React, { useState, useEffect } from 'react';
import { getTasks } from '../api';

const TaskList = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks(token);
        setTasks(data);
      } catch (error) {
        setMessage('Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      {message && <div className="text-center text-red-500 mb-4">{message}</div>}
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task._id} className="p-4 border border-gray-300 rounded">
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-sm text-gray-500">Status: {task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
