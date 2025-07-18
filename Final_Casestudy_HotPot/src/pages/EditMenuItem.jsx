// src/pages/EditMenuItem.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axiosConfig';
import '../styles/EditMenuItem.css';

const EditMenuItem = ({ currentUser }) => {
  const { menuId } = useParams();
  const navigate = useNavigate();
  const token = currentUser?.token;
  const restaurantId = currentUser?.restaurant?.id;

  const [menuItem, setMenuItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const res = await axios.get(`/api/menu-items/${menuId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // If restaurant info is missing, fallback to currentUser's restaurant
        const fetchedItem = res.data;
        if (!fetchedItem.restaurantId && restaurantId) {
          fetchedItem.restaurantId = restaurantId;
        }

        setMenuItem(fetchedItem);
      } catch (error) {
        console.error('❌ Error fetching menu item:', error);
        alert('Failed to load menu item.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [menuId, token, restaurantId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem((prev) => ({
      ...prev,
      [name]: name === 'veg' || name === 'availability' ? value === 'true' : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...menuItem,
        price: parseFloat(menuItem.price),
        veg: menuItem.veg === true || menuItem.veg === 'true',
        availability: menuItem.availability === true || menuItem.availability === 'true',
        restaurantId: menuItem.restaurantId || restaurantId,
      };

      await axios.put(`/api/menu-items/${menuId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('✅ Menu item updated successfully!');
      navigate('/restaurant/home');
    } catch (error) {
      console.error('❌ Error updating menu item:', error.response?.data || error.message);
      alert('Failed to update menu item.');
    }
  };

  if (loading) return <div className="container mt-5">Loading menu item...</div>;
  if (!menuItem) return <div className="container mt-5">Menu item not found.</div>;

  return (
    <div className="container mt-5 edit-menu-form">
      <h2>Edit Menu Item</h2>
      <form onSubmit={handleSubmit}>
        {/* Restaurant ID (Read-Only) */}
        <div className="mb-3">
          <label className="form-label">Restaurant ID</label>
          <input
            type="text"
            className="form-control"
            value={menuItem.restaurantId || restaurantId}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={menuItem.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="3"
            value={menuItem.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            name="category"
            className="form-control"
            value={menuItem.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input
            type="number"
            name="price"
            step="0.01"
            className="form-control"
            value={menuItem.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            className="form-control"
            value={menuItem.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dietary Type</label>
          <select
            name="veg"
            className="form-select"
            value={menuItem.veg ? 'true' : 'false'}
            onChange={handleChange}
          >
            <option value="true">Veg</option>
            <option value="false">Non-Veg</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Availability</label>
          <select
            name="availability"
            className="form-select"
            value={menuItem.availability ? 'true' : 'false'}
            onChange={handleChange}
          >
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Save Changes</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/restaurant/home')}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditMenuItem;
