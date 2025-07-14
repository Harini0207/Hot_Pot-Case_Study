import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/AdminDashboard.css";

function DashboardAdmin() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "LOW",
    status: "PENDING",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    api.get("/tasks")
      .then(res => setTasks(res.data))
      .catch(() => alert("Error loading tasks"));
  };

  const handleDelete = (id) => {
    api.delete(`/tasks/${id}`)
      .then(() => {
        alert("Task deleted");
        fetchTasks();
      })
      .catch(() => alert("Error deleting"));
  };

  const handleStatusUpdate = (id, newStatus) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const updatedTask = {
      id: task.id,
      title: task.title?.trim() || "Untitled Task",
      description: task.description || "",
      dueDate: task.dueDate,
      priority: task.priority || "LOW",
      status: newStatus
    };

    api.put(`/tasks/${id}`, updatedTask)
      .then(() => fetchTasks())
      .catch(err => {
        console.error("Update error:", err.response?.data || err.message);
        alert("Error updating task. Please check required fields.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/tasks", newTask)
      .then(() => {
        alert("Task Created!");
        setNewTask({
          title: "",
          description: "",
          dueDate: "",
          priority: "LOW",
          status: "PENDING",
        });
        fetchTasks();
      })
      .catch(() => alert("Error creating task"));
  };

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      <div className="task-form-section">
        <h3>Create Task</h3>
        <form onSubmit={handleSubmit} className="task-form">
          <input
            placeholder="Title"
            value={newTask.title}
            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
          <input
            placeholder="Description"
            value={newTask.description}
            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
          />
          <input
            type="date"
            value={newTask.dueDate}
            onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })}
            required
          />
          <select
            value={newTask.priority}
            onChange={e => setNewTask({ ...newTask, priority: e.target.value })}
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
          <select
            value={newTask.status}
            onChange={e => setNewTask({ ...newTask, status: e.target.value })}
          >
            <option value="PENDING">PENDING</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
          <button type="submit" className="add-task-btn">Add Task</button>
        </form>
      </div>

      <h3>All Tasks</h3>
      {tasks.map(task => (
        <div key={task.id} className="task-card">
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p><strong>Due:</strong> {task.dueDate}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <p><strong>Status:</strong> {task.status}</p>

          <select
            value={task.status}
            onChange={(e) => handleStatusUpdate(task.id, e.target.value)}
            className="status-select"
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>

          <button onClick={() => handleDelete(task.id)} className="delete-btn">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default DashboardAdmin;
