// src/pages/AddMenu.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import '../styles/AddMenu.css';

const AddMenu = ({ currentUser }) => {
  const navigate = useNavigate();
  const restaurantId = currentUser?.restaurant?.id;
  const token = currentUser?.token;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    imageUrl: '',
    veg: 'true',
    availability: 'true',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        veg: formData.veg === 'true',
        availability: formData.availability === 'true',
        restaurant: { id: restaurantId }, // ✅ Correct structure
      };

      await axios.post('/api/menu-items', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('✅ Menu item added successfully!');
      navigate('/restaurant/home');
    } catch (error) {
      console.error('❌ Failed to add menu item:', error);
      alert('Something went wrong while adding the menu item.');
    }
  };

  return (
    <div className="container mt-5 add-menu-form">
      <h2>Add New Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Restaurant ID</label>
          <input type="text" className="form-control" value={restaurantId} readOnly />
        </div>
        <div className="mb-3">
          <label className="form-label">Item Name</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" rows="3" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input type="text" name="category" className="form-control" value={formData.category} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input type="number" step="0.01" name="price" className="form-control" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input type="text" name="imageUrl" className="form-control" value={formData.imageUrl} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Dietary Type</label>
          <select name="veg" className="form-select" value={formData.veg} onChange={handleChange}>
            <option value="true">Veg</option>
            <option value="false">Non-Veg</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Availability</label>
          <select name="availability" className="form-select" value={formData.availability} onChange={handleChange}>
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">Add Menu Item</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/restaurant/home')}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddMenu;
