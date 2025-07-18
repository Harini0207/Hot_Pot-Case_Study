
import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../styles/RestaurantDashboard.css';

const RestaurantDashboard = ({ currentUser }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [restaurantOrders, setRestaurantOrders] = useState([]);
  const [restaurantReviews, setRestaurantReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem('currentUser'));
  const token = storedUser?.token;
  const restaurantId = storedUser?.restaurant?.id;

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        if (!restaurantId) return;
        const res = await axios.get(`/api/menu-items/restaurant/${restaurantId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMenuItems(res.data);
      } catch (err) {
        console.error('❌ Error fetching menu items:', err);
      }
    };
    fetchMenuItems();
  }, [restaurantId, token]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!restaurantId) return;
        const res = await axios.get(`/api/orders/restaurant/id/${restaurantId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRestaurantOrders(res.data);
      } catch (err) {
        console.error('❌ Error fetching restaurant orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [restaurantId, token]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!restaurantId) return;
        const res = await axios.get(`/api/reviews/restaurant/${restaurantId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRestaurantReviews(res.data);
      } catch (err) {
        console.error('❌ Error fetching reviews:', err);
      }
    };
    fetchReviews();
  }, [restaurantId, token]);

  const handleEdit = (menuId) => navigate(`/restaurant/editMenu/${menuId}`);

  const handleDelete = async (menuId) => {
    if (!window.confirm("Are you sure you want to delete this menu item?")) return;
    try {
      await axios.delete(`/api/menu-items/${menuId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMenuItems(prev => prev.filter(item => item.id !== menuId));
      alert(" Menu item deleted!");
    } catch (err) {
      console.error("❌ Failed to delete:", err);
      alert("❌ Failed to delete menu item.");
    }
  };

  const getImage = (imageName) => {
    try {
      return require(`../images/${imageName}`);
    } catch {
      return require('../images/food.jpg');
    }
  };

  if (loading) return <p className="container mt-5">Loading dashboard...</p>;

  return (
    <div className="container mt-4 restaurant-dashboard">
      <h2 className="restaurant-title">🍽️ Welcome, {storedUser?.name || storedUser?.email}!</h2>
      <p className="text-muted">Here are your restaurant’s menu items, orders, and reviews:</p>

      {/* Menu Items Section */}
      <section className="menu-section mb-5">
        <h4 className="section-title">📋 Menu Items</h4>
        {menuItems.length === 0 ? (
          <p>No menu items found.</p>
        ) : (
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price ₹</th>
                <th>Description</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((menu, idx) => (
                <tr key={menu.id}>
                  <td>{idx + 1}</td>
                  <td><img src={getImage(menu.imageUrl)} alt={menu.name} width="60" height="50" /></td>
                  <td>{menu.name}</td>
                  <td>{menu.price}</td>
                  <td>{menu.description}</td>
                  <td>{menu.category}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(menu.id)}>EDIT</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(menu.id)}>DELETE</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Orders Section */}
      <section className="order-section mb-5">
        <h4 className="section-title">🧾 Orders Received</h4>
        {restaurantOrders.length === 0 ? (
          <p>No orders received yet.</p>
        ) : (
          <table className="table table-bordered table-hover">
            <thead className="table-secondary">
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Address</th>
                <th>Total ₹</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {restaurantOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.user?.email}</td>
                  <td>{order.status}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.shippingAddress}</td>
                  <td>{order.totalAmount}</td>
                  <td>{new Date(order.orderDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Reviews Section */}
      <section className="review-section mb-5">
        <h4 className="section-title">🌟 Customer Reviews</h4>
        {restaurantReviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <table className="table table-striped table-bordered">
            <thead className="table-warning">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Menu Item</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {restaurantReviews.map((review, idx) => (
                <tr key={review.id}>
                  <td>{idx + 1}</td>
                  <td>{review.user?.email}</td>
                  <td>{review.menuItem?.name}</td>
                  <td>{"⭐".repeat(review.rating)}</td>
                  <td>{review.comment}</td>
                  <td>{new Date(review.reviewDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default RestaurantDashboard;
