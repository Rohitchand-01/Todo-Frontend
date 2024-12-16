import React, { useState } from 'react';
import axios from 'axios';

const AddTask = ({ setTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = { title, description, status: 'pending' };

    axios.post('http://localhost:3000/tasks', newTask)
      .then((response) => {
        setTasks((prevTasks) => [...prevTasks, response.data]);
        setTitle('');
        setDescription('');
      })
      .catch((error) => console.error('Error adding task:', error));
  };

  return (
    <form onSubmit={handleAddTask} className="mb-4">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Task</button>
    </form>
  );
};

export default AddTask;
