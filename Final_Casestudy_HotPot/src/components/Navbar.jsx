// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.jpg'; // Logo image
import '../components/Navbar.css'; // Import CSS

const Navbar = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="navbar-wrapper d-flex justify-content-between align-items-center">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <span className="brand-name">HotByte</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex flex-row gap-2">
            {!currentUser && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              </>
            )}
            {currentUser?.role === 'user' && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/user/home">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/cart">Cart</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/orders">My Orders</Link></li>
                <li className="nav-item"><button className="nav-link btn btn-link text-danger" onClick={logout}>Logout</button></li>
              </>
            )}
            {currentUser?.role === 'admin' && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/admin/dashboard">Dashboard</Link></li>
                <li className="nav-item"><button className="nav-link btn btn-link text-danger" onClick={logout}>Logout</button></li>
              </>
            )}
            {currentUser?.role === 'restaurant' && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/restaurant/home">Restaurant Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/restaurant/addMenu">Add Menu</Link></li>
                
                <li className="nav-item"><button className="nav-link btn btn-link text-danger" onClick={logout}>Logout</button></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
