// src/pages/Home.jsx
import React from 'react';

import '../styles/Home.css'; // 👈 Import custom CSS

function Home() {
  return (
    <div className="home-wrapper d-flex align-items-center justify-content-center">
      <div className="home-card text-center p-5 shadow-lg rounded">
        <h1 className="mb-3 text-primary">Welcome to Task Manager</h1>
        <p className="mb-4 subtitle-text">A sleek task manager powered by React & Spring Boot.</p>

        <div>
         
        </div>
      </div>
    </div>
  );
}

export default Home;
