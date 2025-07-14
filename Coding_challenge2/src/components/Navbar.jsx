import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../services/auth';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">Task Manager</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          {!currentUser && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          )}

          {currentUser?.role === 'ROLE_USER' && (
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/user">User Dashboard</Link>
            </li>
          )}

          {currentUser?.role === 'ROLE_ADMIN' && (
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/admin">Admin Dashboard</Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <button className="btn btn-outline-light ms-3" onClick={logout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
