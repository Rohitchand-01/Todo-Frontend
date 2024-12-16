import React, { useState } from 'react';
import axios from 'axios';

const UpdateTask = ({ task, setTasks }) => {
  const [status, setStatus] = useState(task.status);

  const handleUpdate = () => {
    axios.put(`${import.meta.env.VITE_DEPLOYEDHOSTNAME}/tasks/${task._id}`, { status })
      .then((response) => {
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t._id === task._id ? response.data : t))
        );
      })
      .catch((error) => console.error('Error updating task:', error));
  };

  return (
    <div className="flex items-center space-x-2">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2"
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button
        onClick={handleUpdate}
        className="bg-green-500 text-white px-4 py-2"
      >
        Update
      </button>
    </div>
  );
};

export default UpdateTask;
