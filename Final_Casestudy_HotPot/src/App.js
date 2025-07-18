// src/App.js
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';   // ✅ NEW
import ResetPassword from './pages/ResetPassword';     // ✅ NEW
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import RestaurantDashboard from './pages/RestaurantDashboard';
import AddMenu from './pages/AddMenu';
import EditMenuItem from './pages/EditMenuItem';
import MyCart from './pages/MyCart';
import OrderHistory from './pages/OrderHistory';
import OrderDetails from './pages/OrderDetails';

// ✅ Auth Route Guard
const RequireAuth = ({ children, role }) => {
  const stored = localStorage.getItem('currentUser');
  if (!stored) return <Navigate to="/login" />;
  const user = JSON.parse(stored);
  return user.role.toLowerCase() === role.toLowerCase() ? children : <Navigate to="/" />;
};

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (stored) setCurrentUser(JSON.parse(stored));
    else console.warn("⚠️ No token found in localStorage.");
  }, []);

  return (
    <>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>

        {/* ✅ Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ✅ User Routes */}
        <Route path="/user/home" element={
          <RequireAuth role="user">
            <UserDashboard currentUser={currentUser} />
          </RequireAuth>
        } />
        <Route path="/cart" element={
          <RequireAuth role="user">
            <MyCart currentUser={currentUser} />
          </RequireAuth>
        } />
        <Route path="/orders" element={
          <RequireAuth role="user">
            <OrderHistory currentUser={currentUser} />
          </RequireAuth>
        } />
        <Route path="/orders/:id" element={
          <RequireAuth role="user">
            <OrderDetails />
          </RequireAuth>
        } />

        {/* ✅ Admin Route */}
        <Route path="/admin/dashboard" element={
          <RequireAuth role="admin">
            <AdminDashboard currentUser={currentUser} />
          </RequireAuth>
        } />

        {/* ✅ Restaurant Routes */}
        <Route path="/restaurant/home" element={
          <RequireAuth role="restaurant">
            <RestaurantDashboard currentUser={currentUser} />
          </RequireAuth>
        } />
        <Route path="/restaurant/addMenu" element={
          <RequireAuth role="restaurant">
            <AddMenu currentUser={currentUser} />
          </RequireAuth>
        } />
        <Route path="/restaurant/editMenu/:menuId" element={
          <RequireAuth role="restaurant">
            <EditMenuItem currentUser={currentUser} />
          </RequireAuth>
        } />
        
        {/* ✅ Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
