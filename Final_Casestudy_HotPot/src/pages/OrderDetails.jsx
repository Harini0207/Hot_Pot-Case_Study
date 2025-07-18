
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import '../styles/OrderDetails.css';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch order:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      await axios.put(`/api/orders/${order.id}/cancel`);
      alert(' Order cancelled successfully.');
      window.location.reload(); // Refresh to update status
    } catch (err) {
      alert('❌ Failed to cancel order.');
      console.error(err);
    }
  };

  const isCancellable = () => {
    if (!order || order.status === 'Cancelled') return false;
    const orderTime = new Date(order.orderDate);
    const now = new Date();
    const diffInMinutes = (now - orderTime) / (1000 * 60);
    return diffInMinutes <= 15;
  };

  if (loading) return <p className="order-loading">⏳ Loading order details...</p>;
  if (!order) return <p className="order-error">❌ Order not found.</p>;

  return (
    <div className="order-container">
      <h2 className="order-title">📄 Order Details (ID: {order.id})</h2>
      <div className="order-info">
        <p><strong>📅 Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
        <p><strong>🚚 Status:</strong> {order.status}</p>
        <p><strong>💳 Payment:</strong> {order.paymentMethod}</p>
        <p><strong>💰 Total:</strong> ₹{order.totalAmount?.toLocaleString('en-IN')}</p>
        <p><strong>🏠 Shipping:</strong> {order.shippingAddress || 'N/A'}</p>
      </div>

      <h4 className="order-items-title">🛒 Items:</h4>
      <ul className="order-items-list">
        {order.orderItems?.map((item, idx) => (
          <li key={idx} className="order-item">
            🍽️ <strong>{item.menuItem?.name || 'Unknown Item'}</strong> × {item.quantity} — ₹{item.price?.toLocaleString('en-IN')}
          </li>
        ))}
      </ul>

      {isCancellable() && (
        <button className="btn-cancel" onClick={handleCancel}>
          Cancel Order
        </button>
      )}

      <button className="btn-back" onClick={() => navigate(-1)}>
        ⬅ Back to Orders
      </button>
    </div>
  );
};

export default OrderDetails;
