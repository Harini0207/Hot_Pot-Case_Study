import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/UserDashboard.css";

function DashboardUser() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("/tasks")
      .then(res => setTasks(res.data))
      .catch(err => alert("Error fetching tasks"));
  }, []);

  return (
    <div className="user-dashboard">
      <h2 className="dashboard-title">User Dashboard</h2>

      <h3>Your Tasks</h3>
      {tasks.map(task => (
        <div key={task.id} className="task-card">
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p><strong>Due:</strong> {task.dueDate}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <p><strong>Status:</strong> {task.status}</p>
        </div>
      ))}
    </div>
  );
}

export default DashboardUser;
