import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const baseURL = import.meta.env.VITE_DEPLOYEDHOSTNAME ;
  console.log(import.meta.env.VITE_DEPLOYEDHOSTNAME)
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks from the backend
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseURL}/tasks`)
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setError("Error fetching tasks");
        setLoading(false);
      });
  }, [baseURL]);

  // Add a new task
  const handleAddTask = () => {
    if (!newTask.title || !newTask.description) {
      setError("Title and Description are required");
      return;
    }

    setLoading(true);
    axios
      .post(`${baseURL}/tasks`, newTask)
      .then((response) => {
        setTasks((prevTasks) => [...prevTasks, response.data]);
        setNewTask({ title: "", description: "" });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error adding task:", error);
        setError("Error adding task");
        setLoading(false);
      });
  };

  // Update a task's status
  const handleUpdateTask = (id, status) => {
    setLoading(true);
    axios
      .put(`${baseURL}/tasks/${id}`, { status })
      .then((response) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === id ? response.data : task))
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
        setError("Error updating task");
        setLoading(false);
      });
  };

  // Delete a task
  const handleDeleteTask = (id) => {
    setLoading(true);
    axios
      .delete(`${baseURL}/tasks/${id}`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        setError("Error deleting task");
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">To-Do List Manager</h1>

        {/* Add Task Form */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="border p-2 rounded-md"
            />
            <textarea
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="border p-2 rounded-md"
            ></textarea>
            <button
              onClick={handleAddTask}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Task"}
            </button>
          </div>
        </div>

        {/* Task List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
          {loading ? (
            <p className="text-gray-500">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-gray-500">No tasks available. Add a task above!</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="border p-4 rounded-md shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold">{task.title}</h3>
                    <p className="text-gray-600">{task.description}</p>
                    <p className="text-sm text-gray-500">
                      Status:{" "}
                      <span className="font-semibold capitalize">
                        {task.status}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <select
                      value={task.status}
                      onChange={(e) => handleUpdateTask(task._id, e.target.value)}
                      className="border p-2 rounded-md"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
